import { ICsvFileGenerationService } from "../core/ICsvFileGenerationService";
import ExcelJS from "exceljs";
import { Buffer } from "buffer";

export const CsvFileGenerationService = (): ICsvFileGenerationService => {
  return {
    generateCsvFile: async (users: any[]): Promise<Buffer> => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Users");

      // Define headers
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
      // Add data rows
      users.forEach((user) => {
        worksheet.addRow({
          name: user.name,
          email: user.email,
          role:
            user.role === "SUPER_ADMIN_ROLE"
              ? "Super Admin"
              : user.role === "ADMIN_ROLE"
              ? "Admin"
              : "Mentor",
          tags: user.tags?.map((tag: any) => tag).join(", ") || "-",
          createdAt: user.createdAt,
          totalSessions: user.progressSummary.totalSessions,
          mentor: user.mentor?.name,
          lastMeeting: user?.progressSummary?.latestProgress
            ? new Date(
                user?.progressSummary?.latestProgress?.date
              ).toLocaleDateString("es-ES")
            : "-",
        });
      });

      // Style the header row
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

      // Generate buffer
      const buffer = await workbook.xlsx.writeBuffer();
      return Buffer.from(buffer);
    },
  };
};
