import Navbar from "@/app/components/Navbar";
import React from "react";

const schemes = [
  {
    no: 1,
    title: "Agriculture Infrastructure Fund",
    date: "12-06-2024",
    type: "Download",
    size: "341 KB",
    format: "pdf",
    link: "#",
  },
  {
    no: 2,
    title: "PM-Kisan Samman Nidhi",
    date: "28-12-2023",
    type: "Link",
    link: "#",
  },
  {
    no: 3,
    title: "ATMA",
    date: "04-04-2025",
    type: "Download",
    size: "1.91 MB",
    format: "pdf",
    link: "#",
  },
  {
    no: 4,
    title: "AGMARKNET",
    date: "14-03-2014",
    type: "Download",
    size: "1.03 MB",
    format: "pdf",
    link: "#",
  },
  {
    no: 5,
    title: "Horticulture",
    date: "05-04-2014",
    type: "Download",
    size: "691.68 KB",
    format: "pdf",
    link: "#",
  },
  {
    no: 6,
    title: "Online Pesticide Registration",
    date: "23-09-2009",
    type: "Download",
    size: "1.25 MB",
    format: "pdf",
    link: "#",
  },
  {
    no: 7,
    title: "Plant Quarantine Clearance",
    date: "05-01-2011",
    type: "Download",
    size: "8.89 MB",
    format: "pdf",
    link: "#",
  },
  {
    no: 8,
    title: "DBT in Agriculture",
    date: "12-05-2014",
    type: "Download",
    size: "749.24 KB",
    format: "pdf",
    link: "#",
  },
  {
    no: 9,
    title: "Pradhanmantri Krishi Sinchayee Yojana",
    date: "06-05-2016",
    type: "Download",
    size: "244.46 KB",
    format: "pdf",
    link: "#",
  },
  {
    no: 10,
    title: "Kisan Call Center",
    date: "01-05-2015",
    type: "Link",
    link: "#",
  },
  {
    no: 11,
    title: "mKisan",
    date: "06-05-2015",
    type: "Link",
    link: "#",
  },
  {
    no: 12,
    title: "Jaivik Kheti",
    date: "18-05-2015",
    type: "Download",
    size: "1.24 MB",
    format: "pdf",
    link: "#",
  },
  {
    no: 13,
    title: "e-Nam",
    date: "04-10-2016",
    type: "Download",
    size: "459.07 KB",
    format: "pdf",
    link: "#",
  },
  {
    no: 14,
    title: "Soil Health Card",
    date: "01-09-2016",
    type: "Download",
    size: "1.1 MB",
    format: "pdf",
    link: "#",
  },
  {
    no: 15,
    title: "Pradhan Mantri Fasal Bima Yojana",
    date: "05-08-2017",
    type: "Download",
    size: "1.09 MB",
    format: "pdf",
    link: "#",
  },
];

export default function GovtSchemesPage() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Government Schemes for Farmers</h1>

        <div className="overflow-auto rounded-lg shadow-md">
          <table className="w-full table-auto border-collapse bg-white">
            <thead className="bg-green-100 text-green-900">
              <tr>
                <th className="py-3 px-4 text-left">Sr. No</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Publish Date</th>
                <th className="py-3 px-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map((scheme) => (
                <tr key={scheme.no} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{scheme.no}</td>
                  <td className="py-3 px-4 font-medium text-gray-800">{scheme.title}</td>
                  <td className="py-3 px-4">{scheme.date}</td>
                  <td className="py-3 px-4">
                    {scheme.type === "Link" ? (
                      <a
                        href={scheme.link}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        Link
                      </a>
                    ) : (
                      <a
                        href={scheme.link}
                        className="text-green-700 underline hover:text-green-900"
                      >
                        Download ({scheme.size}) {scheme.format}
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}