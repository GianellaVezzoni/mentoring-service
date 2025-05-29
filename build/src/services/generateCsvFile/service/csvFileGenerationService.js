"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvFileGenerationService = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const buffer_1 = require("buffer");
const CsvFileGenerationService = () => {
    return {
        generateCsvFile: async (users) => {
            const workbook = new exceljs_1.default.Workbook();
            const worksheet = workbook.addWorksheet("Users");
            worksheet.columns = [
                { header: "Nombre", key: "name", width: 30 },
                { header: "Email", key: "email", width: 30 },
                { header: "Rol", key: "role", width: 15 },
                { header: "Etiquetas", key: "tags", width: 40 },
                { header: "Desde", key: "createdAt", width: 20 },
                { header: "Cantidad de sesiones", key: "totalSessions", width: 20 },
                { header: "Mentor/a", key: "mentor", width: 20 },
                { header: "Ultimo encuentro", key: "lastMeeting", width: 20 },
            ];
            users.forEach((user) => {
                worksheet.addRow({
                    name: user.name,
                    email: user.email,
                    role: user.role === "SUPER_ADMIN_ROLE"
                        ? "Super Admin"
                        : user.role === "ADMIN_ROLE"
                            ? "Admin"
                            : "Mentor",
                    tags: user.tags?.map((tag) => tag).join(", ") || "-",
                    createdAt: user.createdAt,
                    totalSessions: user.progressSummary.totalSessions,
                    mentor: user.mentor?.name,
                    lastMeeting: user?.progressSummary?.latestProgress
                        ? new Date(user?.progressSummary?.latestProgress?.date).toLocaleDateString("es-ES")
                        : "-",
                });
            });
            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).alignment = {
                vertical: "middle",
                horizontal: "center",
                wrapText: true,
                shrinkToFit: true,
            };
            worksheet.getRow(1).height = 20;
            worksheet.getRow(1).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "fffcd702" },
                bgColor: { argb: "FF000000" },
            };
            const buffer = await workbook.xlsx.writeBuffer();
            return buffer_1.Buffer.from(buffer);
        },
    };
};
exports.CsvFileGenerationService = CsvFileGenerationService;
