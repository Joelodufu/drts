const firebase = require("firebase/app");
require("firebase/storage");

class UploadService {
  constructor() {
    // Initialize Firebase with your Firebase project configuration
    const firebaseConfig = {
       apiKey: "AIzaSyDXJu7Cri0B8mpsdkBpvJP4LlNbDw1yJCg",
  authDomain: "drts-8f23c.firebaseapp.com",
  projectId: "drts-8f23c",
  storageBucket: "drts-8f23c.appspot.com",
  messagingSenderId: "633109881341",
  appId: "1:633109881341:web:b671ee53f73b19608cf994",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.storage = firebase.storage();
    this.storageRef = this.storage.ref();
  }

  
  async uploadFile(file, destination) {
    try {
      const fileRef = this.storageRef.child(destination);
      await fileRef.put(file);
      const downloadUrl = await fileRef.getDownloadURL();
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading file to Firebase Storage:", error);
      throw error;
    }
  }

  async uploadFilesToFirebaseStorage(files) {
    const uploadPromises = [];

    for (const [documentName, file] of Object.entries(files)) {
      if (file) {
        const destination = `documents/${documentName}/${file.name}`;
        const uploadedUrl = await this.uploadFile(file, destination);
        uploadPromises.push({
          documentName,
          url: uploadedUrl,
        });
      }
    }

    return uploadPromises;
  }

  async sendUrlsToServer(urls) {
    try {
      // Make a POST request to your server to send the URLs
      const response = await axios.post("YOUR_SERVER_ENDPOINT", { urls });
      return response.data;
    } catch (error) {
      console.error("Error sending URLs to the server:", error);
      throw error;
    }
  }
}

module.exports = UploadService;
