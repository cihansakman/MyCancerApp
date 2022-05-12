export const cancerTypes = [
  "Lung Adenocarcinoma",
  "Lung Squamos Cell Carcinoma",
];
export const gender = ["Male", "Female"];
export const tumor_stage = ["1", "2", "3", "4"];
export const site_of_resection = [
  "Upper lobe, lung",
  "Lower lobe, lung",
  "Middle lobe, lung",
  "Lung, NOS",
  "Overlapping lesion of lung",
  "Main bronchus",
];

export const primary_diagnosis_luad = [
  "Adenocarcinoma, NOS",
  "Adenocarcinoma with mixed subtypes",
  "Acinar cell carcinoma",
  "Papillary adenocarcinoma, NOS",
  "Bronchiolo-alveolar carcinoma, non-mucinous",
  "Mucinous adenocarcinoma",
  "Solid carcinoma, NOS",
  "Bronchio-alveolar carcinoma, mucinous",
  "Micropapillary carcinoma, NOS",
  "Bronchiolo-alveolar adenocarcinoma, NOS",
  "Clear cell adenocarcinoma, NOS",
  "Signet ring cell carcinoma",
];
export const primary_diagnosis_lusc = [
  "Squamous cell carcinoma, NOS",
  "Basaloid squamous cell carcinoma",
  "Squamous cell carcinoma, keratinizing, NOS",
  "Papillary squamous cell carcinoma",
  "Squamous cell carcinoma, large cell, nonkeratinizing, NOS",
  "Squamous cell carcinoma, small cell, nonkeratinizing",
];
export const morphology_luad = [
  "8140",
  "8255",
  "8550",
  "8260",
  "8252",
  "8480",
  "8230",
  "8253",
  "8250",
  "8265",
  "8310",
  "8490",
];
export const morphology_lusc = ["8070", "8083", "8071", "8052", "8072", "8073"];
export const race_luad = [
  "Other",
  "American Indian or Alaska Native",
  "Asian",
  "Black or African American",
  "White",
];

//Min and Max values from dataset
export const minCigarettesPerDay = 0;
export const maxCigarettesPerDay = 15;

//Min-Max age LUAD 33-88, LUSC 39-90
export const minAge = 35;
export const maxAge = 90;

//Top 10 Genes of LUAD
export const luad10Genes = [
  {
    item: "CDH10",
    id: "CDH10",
  },
  {
    item: "COL11A1",
    id: "COL11A1",
  },
  {
    item: "CSMD3",
    id: "CSMD3",
  },
  {
    item: "HMCN1",
    id: "HMCN1",
  },
  {
    item: "KEAP1",
    id: "KEAP1",
  },
  {
    item: "KRAS",
    id: "KRAS",
  },
  {
    item: "LRP1B",
    id: "LRP1B",
  },
  {
    item: "SPTA1",
    id: "SPTA1",
  },
  {
    item: "TP53",
    id: "TP53",
  },
  {
    item: "USH2A",
    id: "USH2A",
  },
];

//Top 10 Genes of LUSC
export const lusc10Genes = [
  {
    item: "CDKN2A",
    id: "CDKN2A",
  },
  {
    item: "CSMD3",
    id: "CSMD3",
  },
  {
    item: "FAT1",
    id: "FAT1",
  },
  {
    item: "KEAP1",
    id: "KEAP1",
  },
  {
    item: "KMT2C",
    id: "KMT2C",
  },
  {
    item: "KMT2D",
    id: "KMT2D",
  },
  {
    item: "NF1",
    id: "NF1",
  },
  {
    item: "NFE2L2",
    id: "NFE2L2",
  },
  {
    item: "PIK3CA",
    id: "PIK3CA",
  },
  {
    item: "TP53",
    id: "TP53",
  },
];
