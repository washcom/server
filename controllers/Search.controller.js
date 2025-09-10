// controllers/searchController.js
import Employee from "../models/Employees.js";
import FileMovement from "../models/FileMovement.js";
import SemiActiveFile from '../models/semi_active_files.js';
import StampedFile from "../models/StampedFile.js";
import { getFiveDigitModel } from "../models/fiveDigits.js";
import FilesToCounty from '../models/files_to_counties.js'
import FilesFromCounty from '../models/files_from_counties.js'

export const searchController = async (req, res) => {
  const { q } = req.query;

  try {
    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const isNumeric = !isNaN(q);

    console.log(`🔎 Search started with query="${q}", page=${page}, limit=${limit}`);

    // ------------------- PARALLEL SEARCHES -------------------
    const [
      employees,
      fileMovements,
      semiActiveFiles,
      stampedFiles,
      fiveDigitResults,
      filesToCounty,
      filesFromCounty,
    ] = await Promise.all([
      // --- Employees ---
      (async () => {
        if (isNumeric) {
          return Employee.find({ payrollNo: Number(q) })
            .skip(skip)
            .limit(limit);
        }
        let found = await Employee.find(
          { $text: { $search: q } },
          { score: { $meta: "textScore" } }
        )
          .sort({ score: { $meta: "textScore" } })
          .skip(skip)
          .limit(limit);

        if (found.length === 0) {
          found = await Employee.find({
            officerName: { $regex: q, $options: "i" },
          })
            .skip(skip)
            .limit(limit);
        }
        return found;
      })(),

      // --- File Movements ---
      (async () => {
        let found = await FileMovement.find(
          { $text: { $search: q } },
          { score: { $meta: "textScore" } }
        )
          .sort({ score: { $meta: "textScore" } })
          .skip(skip)
          .limit(limit)
          .populate("payrollNo");

        if (found.length === 0) {
          found = await FileMovement.find({
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

          if (found.length === 0) {
            found = await FileMovement.find()
              .populate({
                path: "payrollNo",
                match: { officerName: { $regex: q, $options: "i" } },
              })
              .skip(skip)
              .limit(limit);

            found = found.filter((fm) => fm.payrollNo);
          }
        }
        return found;
      })(),

      // --- Semi Active Files ---
      (async () => {
        let found = await SemiActiveFile.find()
          .populate({
            path: "payrollNo",
            match: { officerName: { $regex: q, $options: "i" } },
          })
          .skip(skip)
          .limit(limit);

        // also match comment field
        return found.filter(
          (f) =>
            f.payrollNo ||
            (f.comment && f.comment.match(new RegExp(q, "i")))
        );
      })(),

      // --- Stamped Files ---
      (async () => {
        let query = [];
        if (isNumeric) query.push({ serialNumber: Number(q) });
        query.push({ shelveNumber: { $regex: q, $options: "i" } });

        return StampedFile.find({ $or: query })
          .populate("payrollNo")
          .skip(skip)
          .limit(limit);
      })(),

      // --- Five Digit Files (loop all 0–9 collections) ---
      (async () => {
        const results = [];
        for (let i = 0; i < 10; i++) {
          const Model = getFiveDigitModel(i);
          let query = [];
          if (isNumeric) query.push({ serialNumber: Number(q) });
          query.push({ shelveLocation: { $regex: q, $options: "i" } });

          const found = await Model.find({ $or: query })
            .populate("payrollNo")
            .skip(skip)
            .limit(limit);

          results.push(...found);
        }
        return results;
      })(),

      // --- Files To County ---
      (async () => {
        return FilesToCounty.find({
          $or: [{ stationName: { $regex: q, $options: "i" } }],
        })
          .populate("payrollNo")
          .skip(skip)
          .limit(limit);
      })(),

      // --- Files From County ---
      (async () => {
        return FilesFromCounty.find({
          $or: [
            { whereFrom: { $regex: q, $options: "i" } },
            { fileType: { $regex: q, $options: "i" } },
            { comments: { $regex: q, $options: "i" } },
          ],
        })
          .populate("payrollNo")
          .skip(skip)
          .limit(limit);
      })(),
    ]);

    // ------------------- RESPONSE -------------------
    console.log("✅ Search complete, sending response");

    res.json({
      query: q,
      pagination: { limit, page },
      employees: { count: employees.length, results: employees },
      fileMovements: { count: fileMovements.length, results: fileMovements },
      semiActiveFiles: { count: semiActiveFiles.length, results: semiActiveFiles },
      stampedFiles: { count: stampedFiles.length, results: stampedFiles },
      fiveDigits: { count: fiveDigitResults.length, results: fiveDigitResults },
      filesToCounty: { count: filesToCounty.length, results: filesToCounty },
      filesFromCounty: { count: filesFromCounty.length, results: filesFromCounty },
    });
  } catch (error) {
    console.error("❌ Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
