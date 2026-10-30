// Credentials GeoExcel lists on its certificates page, reviewed 29 Oct 2026.
// IMPORTANT: numbers and dates were read from screenshots of the scans.
// Re-check every digit against geoexcel.group/certificates before submitting.
//
// Deliberately NOT included (they appear on the raw scans):
//  - PAN, phone numbers, email addresses, director/signatory/officer names
//  - the IEC number, because an IEC is the company's PAN
//
// Rules: nothing is labelled "valid" or "verified". `null` is shown as
// "To be confirmed by GeoExcel".

export const credentials = [
  {
    id: 'apeda',
    title: 'APEDA registration-cum-membership certificate',
    issuer: 'Agricultural and Processed Food Products Export Development Authority (APEDA), Bengaluru',
    number: 'RCMC/APEDA/04107/2023-2024',
    scope: 'Export of frozen potato products such as French fries, potato wedges, hash brown and burger patties',
    issued: '22 Dec 2023',
    validUpTo: '31 Mar 2028',
    status: 'listed',
    note: 'This registration lists frozen potato products only. Other product categories are not mentioned in it.',
    verifyUrl: 'https://apeda.gov.in',
    verifyLabel: 'Go to APEDA',
  },
  {
    id: 'fssai',
    title: 'FSSAI licence (Form C, central licence)',
    issuer: 'Food Safety and Standards Authority of India (FSSAI)',
    number: '11224999000123',
    scope: 'Trade/retail: trader/merchant, exporter',
    issued: '21 Feb 2024 (new licence)',
    validUpTo: '20 Feb 2025',
    status: 'date-passed',
    note: 'The first page says "for details, refer annexure". The licence has a validity annexure that was not reviewed, so the current end date may differ. Check the number on FSSAI FoSCoS.',
    verifyUrl: 'https://foscos.fssai.gov.in',
    verifyLabel: 'Check on FSSAI FoSCoS',
  },
  {
    id: 'udyam',
    title: 'Udyam registration certificate (MSME)',
    issuer: 'Ministry of Micro, Small and Medium Enterprises, Government of India',
    number: 'UDYAM-KR-03-0337742',
    scope: 'Micro enterprise. Major activity listed: Trading',
    issued: '20 Dec 2023',
    validUpTo: 'Not stated on the certificate',
    status: 'listed',
    note: null,
    verifyUrl: 'https://udyamregistration.gov.in',
    verifyLabel: 'Go to Udyam portal',
  },
  {
    id: 'iec',
    title: 'Importer-Exporter Code (IEC)',
    issuer: 'Directorate General of Foreign Trade (DGFT)',
    number: undefined,
    numberNote: 'Not shown here: the IEC number is the company\u2019s PAN.',
    scope: 'Importer-Exporter Code issued to GeoExcel Production Trades Private Limited',
    issued: '19 Dec 2023',
    validUpTo: 'Not stated on the document',
    status: 'listed',
    note: 'DGFT\u2019s site lets you look up an IEC under Services, then View Any IEC Details.',
    verifyUrl: 'https://www.dgft.gov.in',
    verifyLabel: 'Go to DGFT',
  },
  {
    id: 'cle',
    title: 'Council for Leather Exports registration-cum-membership certificate',
    issuer: 'Council for Leather Exports (CLE), Chennai',
    number: 'RCMC/CLE/00635/2023-2024',
    scope: 'Leather footwear',
    issued: '2 Mar 2024',
    validUpTo: '31 Mar 2024',
    status: 'date-passed',
    note: 'This relates to the Fashion & Lifestyle range, not the food products. Whether that range is active is to be confirmed by GeoExcel.',
    verifyUrl: 'https://leatherindia.org',
    verifyLabel: 'Go to Council for Leather Exports',
  },
]

export const entity = {
  legalName: 'GeoExcel Production Trades Private Limited',
  incorporated: '8 Nov 2023',
  reviewedOn: '29 Oct 2026',
}
