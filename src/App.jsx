import * as React from "react";
import { useState, useRef } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import DropMenu from "./Components/Category/DropMenu";
import SetPriority from "./Components/Priority/SetPrority";
import { v4 as uuidv4 } from 'uuid';
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#2B7FFF",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [editValue, setEditValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const categoryRef = useRef("");
  const EditIdRef=useRef('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const PriorityRef = useRef("");

  const addNewItem = () => {
      
    const trimmed = input.trim();
    const selectedCategory = categoryRef.current;
    if (!trimmed || !selectedCategory) return;
    const newUuid = uuidv4();
    
    
    const newItem = {
      value: trimmed,
      category: selectedCategory,
      id: newUuid 
    };
    
    setItems((prev) => [...prev, newItem]);
    setInput("");
    filterByCategory(selectedCategory, [...items, newItem]);
  };
  
  const removeItem = (paraid) => {

      
        
    const updated = items.filter((item, i) => item.id !== paraid);
    setItems(updated);
    filterByCategory(categoryRef.current, updated);
  };

  const editItem = (id) => {
    EditIdRef.current=id;
    handleOpen();
  };
  console
  const confirmEdit = () => {
    if (!editValue.trim()) return;

    const updated = items.map((item, i) => {
      if (item.id === EditIdRef.current) {
        item.Priority = PriorityRef.current;
      }
      return item.id  === EditIdRef.current ? { ...item, value: editValue.trim() } : item;
    });

    setItems(updated);
    filterByCategory(categoryRef.current, updated);
    handleClose();
  };
 
  const filterByCategory = (category, fullList = items) => {
    categoryRef.current = category;
    if (!category) {
      setFilteredItems(fullList);
    } else {
      setFilteredItems(fullList.filter((item) => item.category === category));
    }
  };


  return (
    <>
      <div className="bg-gray-600 p-5 rounded-2xl shadow-md pt-7 w-full max-w-xl mx-auto Fcard  ">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            maxLength={20}
            onChange={(e) => setInput(e.target.value)}
            className="outline-0 border p-1.5 rounded flex-1 px-3"
            placeholder="Type something..."
          />
          <DropMenu categoryRef={categoryRef} para={items} setFilterCategory={setFilteredItems} filterByCategory={filterByCategory} />
          <button className="ml-1 px-4 py-2 rounded-full bg-blue-500 text-white" onClick={addNewItem}>
            +
          </button>
        </div>

        <div className="mt-4">
          {filteredItems.map((item, i) => (
            <p key={i} className="flex justify-between px-2 mt-2 items-center border-b pb-1 overflow-clip text-gray-700 mainP" id={item.id} >
              {item.value}
              <span className="flex justify-center items-center">
                <svg width="140" height="40" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="glowRed" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glowOrange" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {item.Priority === "Low" ? (
                    <circle cx="160" cy="30" r="10" fill="deepskyblue" filter="url(#glowBlue)" className="scale-70" />
                  ) : item.Priority === "Medium" ? (
                    <circle cx="160" cy="30" r="10" fill="orange" filter="url(#glowOrange)" className="scale-70" />
                  ) : item.Priority === "High" ? (
                    <circle cx="160" cy="30" r="10" fill="red" filter="url(#glowRed)" className="scale-70" />
                  ) : (
                    <circle cx="160" cy="30" r="10" fill="orange" filter="url(#glowOrange)" className="scale-70" />
                  )}
                </svg>

                <span className="inline-flex gap-1">
                  <Button variant="contained" color="info" onClick={() => editItem(item.id)}>
                    <EditIcon />
                  </Button>
                  <Button variant="contained" color="error" onClick={ () => removeItem(item.id)}>
                    <DeleteIcon />
                  </Button>
                </span>
              </span>
            </p>
          ))}
        </div>
      </div>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(128, 128, 128, 0.2)",
            },
          },
        }}
      >
        <Box sx={modalStyle} className="bg-gray-500!">
          <input
            maxLength={20}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none   "
          />
          <div className="flex justify-end mt-4 ">
            <SetPriority PriorityRef={PriorityRef} />
            <Button className="h-13.5" variant="contained" color="primary" onClick={confirmEdit}>
              Update
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default App;
