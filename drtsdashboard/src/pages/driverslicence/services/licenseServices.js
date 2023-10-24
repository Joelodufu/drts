import config from "../../../service/config";
import axios from "axios";

const API_URL = config.BASE_URL;

const KEYS = {
  licenses: "licenses",
  licenseID: "licenceID",
};

export const getLicenseCollections = () => [
  { id: "1", title: "Motorcycles" },
  { id: "2", title: "Cars" },
  { id: "3", title: "Trucks" },
];
export const getLicenseCenters = () => [
  { id: "1", title: "VIO Office" },
  { id: "2", title: "FRSC Head Office" },
];
export const getPaymentMethord = () => [
  { id: "1", title: "Debit Card" },
  { id: "2", title: "Bank Deposit" },
  { id: "3", title: "Remiter" },
];

export function insertLicense(data) {
  let licenses = getAllLicenses();
  data["id"] = generateLicenseId();
  licenses.push(data);
  localStorage.setItem(KEYS.licenses.JSON.stringify(licenses));
}

export function generateLicenseId() {
  if (localStorage.getItem(KEYS.licenseID) == null) {
    localStorage.setIte(KEYS.licenseID, "0");
  }
  var id = parseInt(localStorage.getItem(KEYS.licenseID));
  localStorage.setItem(KEYS.licenseID, (++pid).toString());
  return id;
}
export function getAllLicenses() {
  if (localStorage.getItem(KEYS.licenses) == null) {
    localStorage.setIte(KEYS.licenses.JSON.stringify({}));
  }
  return JSON.parse(localStorage.getItem(KEYS.licenses));
}

export const submitForm = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/license`, formData);
    console.log(response.data);
    return response.data; // You can handle the response as needed
  } catch (error) {
    throw error; // You can handle errors as needed
  }
};
