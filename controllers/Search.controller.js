import Employee from "../models/Employees.js";
import FileMovement from "../models/FileMovement.js";

export const searchController = async (req, res) => {
  const { q } = req.query;

  try {
    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    console.log(`🔎 Search started with query="${q}", page=${page}, limit=${limit}`);

    // Run both searches in parallel
    let [employees, fileMovements] = await Promise.all([
      // Employees
      Employee.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } })
        .skip(skip)
        .limit(limit),

      // File Movements
      FileMovement.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } })
        .skip(skip)
        .limit(limit)
        .populate("payrollNo"),
    ]);

    console.log(`👥 Employees found with text search: ${employees.length}`);
    console.log(`📂 FileMovements found with text search: ${fileMovements.length}`);

    // Fallbacks if no text index matches
    if (employees.length === 0) {
      employees = await Employee.find({
        officerName: { $regex: q, $options: "i" },
      })
        .skip(skip)
        .limit(limit);
      console.log(`👥 Employees found with regex search: ${employees.length}`);
    }

    if (fileMovements.length === 0) {
      fileMovements = await FileMovement.find({
        $or: [
          { destination: { $regex: q, $options: "i" } },
          { collectedBy: { $regex: q, $options: "i" } },
          { returnedBy: { $regex: q, $options: "i" } },
          { receivedBy: { $regex: q, $options: "i" } },
          { fileType: { $regex: q, $options: "i" } },
        ],
      })
        .skip(skip)
        .limit(limit)
        .populate("payrollNo");

      console.log(`📂 FileMovements found with regex search: ${fileMovements.length}`);

      // Extra: search inside linked Employee (payrollNo.officerName)
      if (fileMovements.length === 0) {
        fileMovements = await FileMovement.find()
          .populate({
            path: "payrollNo",
            match: { officerName: { $regex: q, $options: "i" } },
          })
          .skip(skip)
          .limit(limit);

        // Remove results where payrollNo didn’t match
        fileMovements = fileMovements.filter(fm => fm.payrollNo);
        console.log(`📂 FileMovements found by employee link: ${fileMovements.length}`);
      }
    }

    console.log("✅ Search complete, sending response");

    res.json({
      query: q,
      pagination: { limit, page },
      employees: {
        count: employees.length,
        results: employees,
      },
      fileMovements: {
        count: fileMovements.length,
        results: fileMovements,
      },
    });
  } catch (error) {
    console.error("❌ Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
