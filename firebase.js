import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, addDoc, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfBXkAHCE4S9wOcwjv54lr2o9San0qRyw",
    authDomain: "pit2-cb407.firebaseapp.com",
    projectId: "pit2-cb407",
    storageBucket: "pit2-cb407.firebasestorage.app",
    messagingSenderId: "487028118358",
    appId: "1:487028118358:web:f4c9605756828332a23cf7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(doc.data());
// });

try {
    window["userData"] = JSON.parse(localStorage.getItem("userData"));
} catch {
    window["userData"] = {};
}

window["login"] = async function(email, pass) {
    const q = query(
        collection(db, "users"), 
        where("email", "==", email), 
        where("pass", "==", pass)
    );
    const querySnapshot = await getDocs(q);
  
    const result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc);
    });

    if (result.length == 0) return alert("Usuário inexistente");

    userData = { ...result[0].data(), id: result[0].id };

    localStorage.setItem("userData", JSON.stringify(userData));

    window.location.href = "../home/index.html";
}

window["register"] = async function(name, email, pass) {
  try {
    userData = { name, email, pass };

    const docRef = await addDoc(collection(db, "users"), userData);

    userData.id = docRef.id;

    localStorage.setItem("userData", JSON.stringify(userData));

    window.location.href = "../home/index.html";    
  } catch (error) {
    console.error("Erro ao adicionar documento:", error);
  }
}

window["edit"] = async function(name, email, pass) {
  try {
    const newUserData = { name, email, pass };

    const docRef = doc(db, "users", userData.id);
    await updateDoc(docRef, newUserData);

    newUserData.id = userData.id;

    localStorage.setItem("userData", JSON.stringify(newUserData));

    window.location.href = "../home/index.html";    
  } catch (error) {
    console.error("Erro ao adicionar documento:", error);
  }
}

window["list"] = async function() {
    if (!userData?.id) return alert("Você não está logado");

    const querySnapshot = await getDocs(collection(db, "products"));

    const result = [];
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });

    return result;
}

window["listOrders"] = async function() {
    if (!userData?.id) return alert("Você não está logado");

    const q = query(
        collection(db, "orders"), 
        where("userId", "==", userData.id)
    );
    const querySnapshot = await getDocs(q);
  
    const result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
}

window["finalizateShop"] = async function() {
    if (!userData?.id) return alert("Você não está logado");
    
    const bag = JSON.parse(localStorage.getItem("bag")) || [];

    try {
        const order = { 
            userId: userData.id,
            bag
         };

        const docRef = await addDoc(collection(db, "orders"), order);

        localStorage.removeItem("bag");

        window.location.href = "../orders/index.html";    
    } catch (error) {
        console.error("Erro ao adicionar documento:", error);
    }
}