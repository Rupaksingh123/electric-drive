//import React, { useState } from "react";
import React, { useState, useEffect } from "react";


const InventoryPage = () => {
  const [formData, setFormData] = useState({
    modelName: "",
    partName: "",
    price: "",
    quantityInStock: ""
  });

  const [status, setStatus] = useState("");
  const [inventory, setInventory] = useState([]); // inventory list


  // handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 👇 edit handler
  const handleEdit = (item) => {
    setFormData(item); // load selected item into the form
  };

  // 👇 delete handler
  const handleDelete = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  // handle form submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    console.log("Saving inventory...");

    const inventoryData = {
      modelName: formData.modelName,
      partName: formData.partName,
      price: formData.price,
      quantityInStock: formData.quantityInStock,
    };



    console.log(inventoryData);
    localStorage.setItem("inventory", JSON.stringify(inventoryData));

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzokwoC8MZSERYjvvje9gzQptZ52Nka7Fj1DdK581cUEixhrGMoYpNla9PWJh-ikpFa4g/exec",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            mode: "addInventory",
            modelName: inventoryData.modelName,
            partName: inventoryData.partName,
            price: inventoryData.price,
            quantityInStock: inventoryData.quantityInStock,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("Response from server:", result);

      if (result.status === "success") {
        

        setStatus("✅ Inventory added successfully!");
        // ✅ Re-fetch latest inventory list
      fetchInventory();
        setFormData({ modelName: "", partName: "", price: "", quantityInStock: "" });
      } else {
        setStatus("❌ Failed to add inventory");
      }
    } catch (error) {
      console.error("Fetch failed:", error.message || error);
      setStatus("⚠️ Error while saving");
    }
  };

  console.log(status);
  // ✅ Fetch all inventory when component loads
  useEffect(() => {
    fetchInventory();
  }, []);

  // const fetchInventory = async () => {
  //   setStatus("Loading...");
  //   try {
  //     const response = await fetch(
  //       "https://script.google.com/macros/s/AKfycbzACOJbNcT-ufvTUkVqpP2MSBysTI1csreBZPDaPJG-UpBteXQ25eePxvB35UE7xu_aUg/exec?mode=getInventory"
  //     );
  //     if (!response.ok) throw new Error("Failed to fetch inventory");
  //     const result = await response.json();
  //     console.log("Fetched records:", result);

  //      const formatted = result.data.map((row, index) => ({
  //       id: index + 1,
  //       modelName: row[0],
  //       partName: row[1],
  //       price: row[2],
  //       quantityInStock: row[3],
  //     }));
  //       setInventory(formatted);



  //     if (result.status === "true" && Array.isArray(result.data)) {
  //       console.log("In success if condition");
  //     //    const formatted = result.data.map((row, index) => ({
  //     //   id: index + 1,
  //     //   modelName: row[0],
  //     //   partName: row[1],
  //     //   price: row[2],
  //     //   quantityInStock: row[3],
  //     // }));
  //     //   setInventory(formatted);
  //       setStatus("");
  //     } else {
  //       setStatus("⚠️ Failed to load inventory");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching inventory:", error);
  //     setStatus("⚠️ Error fetching data");
  //   }
  // };


  const fetchInventory = async () => {
  setStatus("Loading...");
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzokwoC8MZSERYjvvje9gzQptZ52Nka7Fj1DdK581cUEixhrGMoYpNla9PWJh-ikpFa4g/exec?mode=getInventory"
    );
    if (!response.ok) throw new Error("Failed to fetch inventory");

    const result = await response.json();
    console.log("Fetched records:", result);

    if (Array.isArray(result.data)) {
      const formatted = result.data.map((row, index) => ({
        id: index + 1,
        modelName: row.modelName,
        partName: row.partName,
        price: row.price,
        quantityInStock: row.quantityInStock,
      }));
      setInventory(formatted);
      setStatus("");
    } else {
      setStatus("⚠️ Failed to load inventory");
    }
  } catch (error) {
    console.error("Error fetching inventory:", error);
    setStatus("⚠️ Error fetching data");
  }
};


  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Inventory Manager</h2>


      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="modelName"
          placeholder="Model Name"
          value={formData.modelName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="partName"
          placeholder="Part Name"
          value={formData.partName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="quantityInStock"
          placeholder="Quantity in Stock"
          value={formData.quantityInStock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {formData.id !== null ? "Add Item" : "Update Item"}
        </button>
      </form>


      {/* Table Section */}
      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">S/N</th>
            <th className="p-2 border">Model Name</th>
            <th className="p-2 border">Part Name</th>
            <th className="p-2 border">Price Per Pic</th>
            <th className="p-2 border">In Stock</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-2">
                No items
              </td>
            </tr>
          ) : (
            inventory.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">{item.modelName}</td>
                <td className="p-2 border">{item.partName}</td>
                <td className="p-2 border">₹{item.price}</td>
                <td className="p-2 border">{item.quantityInStock}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};


export default InventoryPage;

