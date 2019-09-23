import { useState, useEffect } from "react";
import { db } from "../../firebase";

function useCollection (url, order) {

  const [data, setData] = useState([]);
  useEffect(() => {

    let collection = db.collection(url);
    if (order) {
      collection = collection.orderBy(order);
    }

    return collection.onSnapshot(snapshot => {
      let docs = [];
      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setData(docs);
    });
  }, [url, order]);
  return data;
};
export default useCollection;
