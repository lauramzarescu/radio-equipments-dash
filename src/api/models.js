import axios from "axios";

export const createEquipmentApi = (name, data) => {
  axios
    .post("http://localhost:8000/api/create-equipment", {
      name,
      data,
    })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      return res;
    });
};

export const getAllEquipmentsApi = () => {
  return axios
    .get("http://localhost:8000/api/get-all-equipments")
    .then((res) => res.data);
};

export const getEquipmentFeaturesApi = (tableName) => {
  return axios
    .get("http://localhost:8000/api/get-equipment-features", {
      params: {
        name: tableName,
      },
    })
    .then((res) => res.data);
};

export const uploadDataToEquipmentApi = (data) => {
  axios.post("http://localhost:8000/api/upload-data", data).then((res) => {
    console.log(res);
    console.log(res.data);
    return res;
  });
};

export const getNumberOfEquipmentsApi = () => {
  return axios
    .get("http://localhost:8000/api/get-number-of-equipments")
    .then((res) => res.data);
};

export const getNumberOfUploadsApi = () => {
  return axios
    .get("http://localhost:8000/api/get-number-of-uploads")
    .then((res) => res.data);
};

export const getLastUploadApi = () => {
  return axios
    .get("http://localhost:8000/api/get-last-upload")
    .then((res) => res.data);
};

export const getEquipmentUploadsApi = () => {
  return axios
    .get("http://localhost:8000/api/get-equipment-uploads")
    .then((res) => res.data);
};

export const getTableSimpleDataApi = () => {
  return axios
    .get("http://localhost:8000/api/get-table-simple-data")
    .then((res) => res.data);
};

export const getUploadsApi = (equipment_id) => {
  return axios
    .get("http://localhost:8000/api/get-uploads", {
      params: { id: equipment_id },
    })
    .then((res) => res.data);
};

export const downloadFileApi = (filename, equipment) => {
  return axios
    .get("http://localhost:8000/api/download-file", {
      params: { equipment: equipment, file: filename },
    })
    .then((res) => res.data);
};

export const getLastWeekApi = (equipment) => {
  return axios
    .get("http://localhost:8000/api/get-last-week", {
      params: { equipment: equipment },
    })
    .then((res) => res.data);
};
