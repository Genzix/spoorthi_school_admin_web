import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiSend, FiCheck, FiX, FiRefreshCw, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import searchIcon from '../assets/Search.svg';
import arrowIcon from '../assets/arrow.svg';
import Add from '../assets/add.svg';
import Logo from '../assets/logo1.png';
import { saveAs } from 'file-saver';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import axios from 'axios';

// Animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Styled Components
const Container = styled.div`
  background-color: #EFEFEF;
  min-height: 70vh;
   margin-top: 3vh;
  padding: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 15px;
`;


const SearchContainer = styled.div`
  position: relative;
  width: 20vw;
`;

const SearchInput = styled.input`
  padding: 10px 15px 10px 2.4vw; 
  width: 100%;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid #FFFFFF;
  background-color: #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  transition: all 0.3s;
  
  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  left: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 2vh;
  pointer-events: none; 
`;

const SelectArrow = styled.img`
  position: absolute;
  right: 0.8vw;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  height: 1vh;
  pointer-events: none;
`;

const FilterSelectContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const FilterSelect = styled.select`
  padding: 10px 15px 10px 1.2vw;
  height: 5.5vh;
  border-radius: 5vw;
  border: 1px solid #ffffff;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2vw;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`;


const ActionButton = styled.button`
  width: 100%;
  padding: 0.6vw;
  border-radius: 0.6vw;
  background-color: ${props => props.variant === 'primary'
    ? '#4a6cf7'
    : props.variant === 'success'
      ? '#28a745'
      : '#FFB942'};
  border: 1px solid ${props => props.variant === 'primary'
    ? '#4a6cf7'
    : props.variant === 'success'
      ? '#28a745'
      : '#FFB942'};
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  color: black;
    text-align: center;
  cursor: pointer;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 5vh;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.variant === 'primary'
    ? '#3a5bd9'
    : props.variant === 'success'
      ? '#218838'
      : '#FFAC1E'};
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;



const TableContainer = styled.div`
  background: #EFEFEF;
  overflow-x: auto;
  transition: all 0.3s ease;
`;

const Table = styled.table`
  min-width: 1200px;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Th = styled.th.withConfig({
  shouldForwardProp: (prop) => !['leftAlign'].includes(prop),
})`
  background: #EFEFEF;
  padding: 1.8vh 0vw;
  text-align: ${props => props.leftAlign ? 'left' : 'center'};
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.7px;
  vertical-align: middle;
  font-weight: 400;
  color: #000000;
  border-bottom: 1px solid #A7A7A7;
  ${props => props.leftAlign && 'padding-left: 1vw;'}

  &:nth-child(1) { width: 2vw; }
  &:nth-child(2) { width: 15vw; }
  &:nth-child(3) { width: 7vw; }
  &:nth-child(4) { width: 9vw; }
  &:nth-child(5) { width: 6vw; }
  &:nth-child(6) { width: 6vw; }
  &:nth-child(7) { width: 6vw; }
  &:nth-child(8) { width: 9vw; }
  &:nth-child(9) { width: 9vw; }
  &:nth-child(10) { width: 5vw; }
  &:nth-child(11) { width: 5vw; }
`;

const Tr = styled.tr`
  border-bottom: 1px solid #A7A7A7;
  transition: all 0.2s;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;
  font-weight: 400;

  &:hover {
    background-color: #FFF3DF;
    transform: scale(1);
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: 2vh 0vw;
  text-align: ${props => props.leftAlign ? 'left' : 'center'};
  color: #000000;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  vertical-align: middle;
  line-height: 1.5;
  ${props => props.leftAlign && 'padding-left: 25px;'}
  word-wrap: break-word;
  transition: all 0.2s;
`;


const StatusBadge = styled.span`
  padding: 1vh 0.8vw;
  border-radius: 1vw;
  background: ${({ status }) => status === 'In Stock' ? '#BEFFB6' : status === 'Low Stock' ? '#FFF9B6' : '#FEA592'};
  color: '#000000';
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  display: inline-block;
  transition: all 0.2s;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  cursor: pointer;
  border-radius: 4px;
  background-color: white;
  border: 1px solid #ddd;
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  
  &:checked {
    background-color: #FFB942;
    border-color: #FFB942;
    
    &::after {
      content: "✓";
      position: absolute;
      color: black;
      font-size: 12px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 16px;
  margin: 0 5px;
  transition: all 0.2s;
  
  &:hover {
    color: #FFB942;
    transform: scale(1.1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  gap: 20px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 185, 66, 0.2);
  border-radius: 50%;
  border-top-color: #FFB942;
  animation: ${spin} 1s ease-in-out infinite;
`;

const LoadingText = styled.p`
  font-size: 16px;
  color: #666;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  color: #666;
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 10px;
`;

const ItemInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DialogContainer = styled.div`
  position: absolute;
  right: 0;
  background-color: #FFE6BB;
  width: 35%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const DialogHeader = styled.div`
  margin-left: 2vw;
  margin-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DialogTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const DialogContent = styled.div`
  flex: 1;
  padding-left: 2vw;
  margin-top: 4vh;
  padding-right: 2vw;
  overflow-y: auto;
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
 margin-top: 3vh;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.6vh;
  margin-top: 0vh;
  font-family: 'Roboto', sans-serif;
  font-size: 0.7vw;
  letter-spacing: 0.7px;
  color: #626060;
  font-weight: 400;
`;


const FormInput = styled.input`
  width: 100%;
  padding: 0.6vw;
  border-radius: 0.6vw;
  border: 1px solid #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`;


const FormSelect = styled.select`
  width: 100%;
  padding: 0.6vw;
  border-radius: 0.6vw;
  border: 1px solid #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 0.8vw;
  letter-spacing: 0.7px;

  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`;


const AddStudentText = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  font-weight: 400;
  cursor: pointer;
  margin-right: 0.1vw;
  color: #000000;
  letter-spacing: 0.7px;
  transition: all 0.2s;

  &:hover {
    color: #FFB942;
  }
`;

const CircleIconContainer = styled.div`
  width: 5.7vh;
  height: 5.7vh;
  border-radius: 50%;
  background:  #FFB942;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
    transform: scale(1.05);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 80px;
  
  &:focus {
    border-color: #FFB942;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 185, 66, 0.2);
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.4vh;
`;

const ImagePreview = styled.img`
  width: 13vh;
  height: 13vh;
  border-radius: 2vh;
  object-fit: cover;
  margin-bottom: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ReportDialogContainer = styled(DialogContainer)`
  width: 40vw;
  max-height: 100vh;
  background: white;
`;

const ReportSummary = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ReportSummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReportSummaryLabel = styled.span`
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 5px;
`;

const ReportSummaryValue = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const ReportTableContainer = styled.div`
  max-height: 100vh;
  overflow-y: auto;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 20px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #FFB942;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #FFAC1E;
  }
`;

const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const ReportThead = styled.thead`
  position: sticky;
  top: 0;
  background-color: #FFB942;
  z-index: 10;
`;

const ReportTbody = styled.tbody``;

const ReportTr = styled.tr`
  border-bottom: 1px solid #e9ecef;
  background: ${props => props.status === 'Out of Stock' ? '#fff0f0' : 'white'};
  
  &:nth-child(even) {
    background: ${props => props.status === 'Out of Stock' ? '#ffeaea' : '#f8f9fa'};
  }
  
  &:hover {
    background: ${props => props.status === 'Out of Stock' ? '#ffdfdf' : '#f1f3f5'};
  }
`;

const ReportTh = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const ReportTd = styled.td`
  padding: 12px 15px;
  color: #333;
  font-size: 0.9rem;
`;

const FeeReminderButton1 = styled.button`
 padding: 1vh 0.8vw;
  border-radius: 5vw;
  color: '#000000';
  margin-left: 0.1vw;
  height: 5.7vh;
  margin-right: auto;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  border: none; 
  font-weight: 400;
  display: inline-block;
  background-color: #FFB942;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FFAC1E;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FeeReminderButton2 = styled.button`
 padding: 1vh 0.8vw;
  border-radius: 5vw;
  color: '#000000';
  margin-left: 0.1vw;
  height: 5.7vh;
  margin-right: auto;
  letter-spacing: 0.7px;
  font-family: "Roboto", sans-serif;
  font-size: 0.8vw;
  border: none; 
  font-weight: 400;
  display: inline-block;
  background-color: #FEA592;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background-color: #FF7E62;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;


const StoreInventory = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    subCategory: '',
    status: ''
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    store_category_id: '',
    subcategory_id: '',
    quantity: '',
    unit: '',
    threshold: '',
    location: '',
    supplier: '',
    price: '',
    status: 'In Stock'
  });
  const [showReorderDialog, setShowReorderDialog] = useState(false);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteSelectedLoading, setDeleteSelectedLoading] = useState(false);

  // API base URL
  const API_BASE_URL = 'https://spoorthischool.genzix.space';

  // Get token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // API headers with authentication
  const getHeaders = () => {
    return {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    };
  };

  // Fetch inventory items
  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/masters/inventory/`, {
        headers: getHeaders()
      });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/masters/store-categories/`, {
        headers: getHeaders()
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch subcategories
  const fetchSubCategories = async (categoryId = null) => {
    try {
      let url = `${API_BASE_URL}/masters/subcategories/`;
      if (categoryId) {
        url += `?store_category_id=${categoryId}`;
      }

      const response = await axios.get(url, {
        headers: getHeaders()
      });

      if (categoryId) {
        setFilteredSubCategories(response.data);
      } else {
        setSubCategories(response.data);
        setFilteredSubCategories([]);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchInventory(),
          fetchCategories(),
          fetchSubCategories()
        ]);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Update filteredItems to handle nested category and subcategory objects
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filters.category ? item.store_category?.id === filters.category : true;
    const matchesSubCategory = filters.subCategory ? item.subcategory?.id === filters.subCategory : true;
    const matchesStatus = filters.status ? item.status === filters.status : true;

    return matchesSearch && matchesCategory && matchesSubCategory && matchesStatus;
  }).reverse(); // Add reverse() to show newest items first

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleAddItem = () => {
    setFormData({
      name: '',
      store_category_id: '',
      subcategory_id: '',
      quantity: '',
      unit: '',
      threshold: '',
      location: '',
      supplier: '',
      price: '',
      status: 'In Stock'
    });
    setShowAddDialog(true);
  };


  const generateReorderReport = () => {
    const lowStock = items.filter(item =>
      item.status === 'Low Stock' || item.status === 'Out of Stock'
    );

    if (lowStock.length === 0) {
      alert('No items need reordering at this time.');
      return;
    }

    setLowStockItems(lowStock);
    setShowReorderDialog(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Enhanced Color palette
    const primaryColor = rgb(0.992, 0.843, 0.431); // FDC86E
    const secondaryColor = rgb(0.2, 0.2, 0.2);
    const accentColor = rgb(0.8, 0.2, 0.2);
    const lightBg = rgb(0.98, 0.98, 0.98);
    const white = rgb(1, 1, 1);
    const grayLine = rgb(0.9, 0.9, 0.9);
    const headerBg = rgb(0.15, 0.15, 0.15);
    const warningColor = rgb(0.9, 0.6, 0.1);
    const okColor = rgb(0.2, 0.6, 0.2);

    try {
      const logoBytes = await fetch(Logo).then(res => res.arrayBuffer());
      const logoImage = await pdfDoc.embedPng(logoBytes);
      const logoDims = logoImage.scale(0.3);

      // Rounded rectangle background for logo
      page.drawRectangle({
        x: 40,
        y: height - 90,
        width: logoDims.width + 20,
        height: logoDims.height + 20,
        color: white,
      });

      // Draw logo
      page.drawImage(logoImage, {
        x: 50,
        y: height - 80,
        width: logoDims.width,
        height: logoDims.height,
      });
    } catch (error) {
      console.error('Error loading logo:', error);
      page.drawText('SPOORTHI', {
        x: 50,
        y: height - 60,
        size: 24,
        font: boldFont,
        color: primaryColor,
      });
    }

    // Company name and report title
    page.drawText('Spoorthi', {
      x: 100,
      y: height - 72,
      size: 26,
      font: boldFont,
      color: secondaryColor,
    });

    page.drawText('REORDER REPORT', {
      x: 50,
      y: height - 120,
      size: 18,
      font: boldFont,
      color: secondaryColor,
    });

    page.drawLine({
      start: { x: 50, y: height - 125 },
      end: { x: 250, y: height - 125 },
      thickness: 2,
      color: primaryColor,
    });

    page.drawText(`Date: ${new Date().toLocaleDateString()}`, {
      x: 400,
      y: height - 120,
      size: 10,
      font,
      color: secondaryColor,
    });

    // Table Headers
    const headers = ['Item Name', 'Current Qty', 'Threshold', 'Status', 'Supplier'];
    const columnWidths = [140, 80, 80, 100, 150];

    // Header background with rounded rectangle
    page.drawRectangle({
      x: 45,
      y: height - 160,
      width: width - 90,
      height: 30,
      color: headerBg,
    });

    headers.forEach((header, i) => {
      const x = 50 + (i === 0 ? 10 : columnWidths.slice(0, i).reduce((a, b) => a + b, 0) + 10);
      page.drawText(header, {
        x,
        y: height - 148,
        size: 12,
        font: boldFont,
        color: white,
      });
    });

    // Table rows with visual polish
    lowStockItems.forEach((item, index) => {
      const y = height - 190 - index * 25;
      if (y < 80) {
        page.drawText('-- Continued on next page --', {
          x: 50,
          y: 60,
          size: 10,
          font,
          color: secondaryColor,
        });
        return;
      }

      page.drawRectangle({
        x: 45,
        y: y - 5,
        width: width - 90,
        height: 25,
        color: index % 2 === 0 ? white : lightBg,
        borderWidth: 0.5,
        borderColor: grayLine,
      });

      const rowData = [
        item.name,
        `${item.quantity} ${item.unit}`,
        item.threshold.toString(),
        item.status,
        item.supplier
      ];

      rowData.forEach((text, i) => {
        let color = secondaryColor;
        if (i === 3) {
          color = item.status.toLowerCase().includes('urgent')
            ? accentColor
            : item.status.toLowerCase().includes('warning')
              ? warningColor
              : okColor;
        }

        const x = 50 + (i === 0 ? 10 : columnWidths.slice(0, i).reduce((a, b) => a + b, 0) + 10);
        page.drawText(text, {
          x,
          y: y + 6,
          size: 10,
          font: i === 3 ? boldFont : font,
          color,
          maxWidth: columnWidths[i] - 10,
        });
      });
    });

    // Footer
    page.drawLine({
      start: { x: 50, y: 70 },
      end: { x: width - 50, y: 70 },
      thickness: 1,
      color: primaryColor,
    });

    page.drawText('© 2023 Spoorthi Inventory Management System', {
      x: 50,
      y: 50,
      size: 10,
      font,
      color: secondaryColor,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, `Spoorthi_Reorder_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };



  const handleEditItem = async (item) => {
    setCurrentItem(item);

    setFormData({
      name: item.name,
      store_category_id: item.store_category?.id || '',
      subcategory_id: item.subcategory?.id || '',
      quantity: item.quantity,
      unit: item.unit,
      threshold: item.threshold,
      location: item.location,
      supplier: item.supplier,
      price: item.price,
      status: item.status
    });

    // Set image preview if item has an image
    if (item.image) {
      setImagePreview(item.image);
    } else {
      setImagePreview(null);
    }

    if (item.store_category?.id) {
      await fetchSubCategories(item.store_category.id);
    }

    setShowEditDialog(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        setDeleteLoading(true);
        await axios.delete(`${API_BASE_URL}/masters/inventory/${itemId}/`, {
          headers: getHeaders()
        });
        await fetchInventory();
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item. Please try again.');
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} selected items?`)) {
      try {
        setDeleteSelectedLoading(true);
        await Promise.all(
          selectedItems.map(id =>
            axios.delete(`${API_BASE_URL}/masters/inventory/${id}/`, {
              headers: getHeaders()
            })
          )
        );
        await fetchInventory();
        setSelectedItems([]);
      } catch (error) {
        console.error('Error deleting selected items:', error);
        alert('Error deleting selected items. Please try again.');
      } finally {
        setDeleteSelectedLoading(false);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showAddDialog) {
      setAddLoading(true);
    } else {
      setEditLoading(true);
    }

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('store_category_id', formData.store_category_id);
      formDataToSend.append('subcategory_id', formData.subcategory_id);
      formDataToSend.append('quantity', parseInt(formData.quantity) || 0);
      formDataToSend.append('unit', formData.unit);
      formDataToSend.append('threshold', parseInt(formData.threshold) || 0);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('supplier', formData.supplier);
      formDataToSend.append('price', parseFloat(formData.price) || 0);
      formDataToSend.append('status', parseInt(formData.quantity) === 0 ? 'Out of Stock' :
        parseInt(formData.quantity) <= parseInt(formData.threshold) ? 'Low Stock' : 'In Stock');

      // Append image if it exists
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const config = {
        headers: {
          ...getHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      };

      if (showAddDialog) {
        await axios.post(`${API_BASE_URL}/masters/inventory/`, formDataToSend, config);
      } else {
        await axios.put(`${API_BASE_URL}/masters/inventory/${currentItem.id}/`, formDataToSend, config);
      }

      await fetchInventory();
      setShowAddDialog(false);
      setShowEditDialog(false);
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item. Please check all required fields and try again.');
    } finally {
      if (showAddDialog) {
        setAddLoading(false);
      } else {
        setEditLoading(false);
      }
    }
  };

  // Update handleCategoryChange to handle both form and filter changes
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    const isFilter = e.target.name === 'filter_category';

    if (isFilter) {
      setFilters(prev => ({
        ...prev,
        category: categoryId,
        subCategory: '' // Reset subcategory filter
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        store_category_id: categoryId,
        subcategory_id: '' // Reset subcategory selection
      }));
    }

    // Fetch subcategories for the selected category
    if (categoryId) {
      await fetchSubCategories(categoryId);
    } else {
      setFilteredSubCategories([]);
    }
  };

  // Update handleSubCategoryChange for filters
  const handleSubCategoryChange = (e) => {
    setFilters(prev => ({
      ...prev,
      subCategory: e.target.value
    }));
  };

  // Update the table row to safely handle price formatting
  const renderPrice = (price) => {
    const numPrice = parseFloat(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  return (
    <Container>
      <TopBar>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <SearchContainer>
            <SearchIcon src={searchIcon} />
            <SearchInput
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterSelectContainer>
            <FilterSelect
              name="filter_category"
              value={filters.category}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </FilterSelect>
            <SelectArrow src={arrowIcon} />
          </FilterSelectContainer>

          <FilterSelectContainer>
            <FilterSelect
              name="filter_subcategory"
              value={filters.subCategory}
              onChange={handleSubCategoryChange}
              disabled={!filters.category}
            >
              <option value="">All Sub-Categories</option>
              {filteredSubCategories.map(subCat => (
                <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
              ))}
            </FilterSelect>
            <SelectArrow src={arrowIcon} />
          </FilterSelectContainer>

          <FilterSelectContainer>
            <FilterSelect
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </FilterSelect>
            <SelectArrow src={arrowIcon} />
          </FilterSelectContainer>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

          <AddStudentText onClick={handleAddItem}>
            Add Item
          </AddStudentText>
          <CircleIconContainer onClick={handleAddItem}>
            <img
              src={Add}
              style={{
                height: '1.8vh',
              }}
            />
          </CircleIconContainer>
          <FeeReminderButton1 variant="success" onClick={generateReorderReport}>Reorder Report
          </FeeReminderButton1>
          {selectedItems.length > 0 && (
            <FeeReminderButton2
              variant="danger"
              onClick={handleDeleteSelected}
              disabled={deleteSelectedLoading}
              style={{
                opacity: deleteSelectedLoading ? 0.7 : 1,
                cursor: deleteSelectedLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {deleteSelectedLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                  Deleting...
                </div>
              ) : (
                'Delete Selected'
              )}
            </FeeReminderButton2>
          )}
        </div>

        {/* <div style={{ display: 'flex', gap: '10px' }}>
        
          {selectedItems.length > 0 && (
            <ActionButton variant="danger" onClick={handleDeleteSelected}>
              <FiTrash2 /> Delete Selected
            </ActionButton>
          )}
          <ActionButton onClick={handleAddItem}>
            <FiPlus /> Add Item
          </ActionButton>
        </div> */}
      </TopBar>

      <TableContainer>
        {loading ? (
          <LoadingContainer>
            <Spinner />
            <LoadingText>Loading inventory...</LoadingText>
          </LoadingContainer>
        ) : filteredItems.length === 0 ? (
          <EmptyState>
            <h3>No items found</h3>
            <p>Try adjusting your search or filters</p>
          </EmptyState>
        ) : (
          <Table>
            <thead>
              <Tr>
                <Th>
                  <Checkbox
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={handleSelectAll}
                  />
                </Th>
                <Th leftAlign>Item</Th>
                <Th>Category</Th>
                <Th>Sub-Category</Th>
                <Th>Quantity</Th>
                <Th>Location</Th>
                <Th>Supplier</Th>
                <Th>Price</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <Tr key={item.id}>
                  <Td>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </Td>
                  <Td leftAlign>
                    <ItemInfoContainer>
                      <ItemImage src={item.image} alt={item.name} />
                      <ItemDetails>
                        <div style={{ fontWeight: '400' }}>{item.name}</div>
                      </ItemDetails>
                    </ItemInfoContainer>
                  </Td>
                  <Td>{item.store_category.name}</Td>
                  <Td>{item.subcategory.name}</Td>
                  <Td>{item.quantity} {item.unit}</Td>
                  <Td>{item.location}</Td>
                  <Td>{item.supplier}</Td>
                  <Td>₹{renderPrice(item.price)}</Td>
                  <Td>
                    <StatusBadge status={item.status}>
                      {item.status}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <IconButton
                      onClick={() => handleEditItem(item)}
                      disabled={editLoading}
                    >
                      <FiEdit2 />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteItem(item.id)}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? <Spinner /> : <FiTrash2 />}
                    </IconButton>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableContainer>

      {/* Add Item Dialog */}
      {showAddDialog && (
        <DialogOverlay>
          <DialogContainer>
            <DialogHeader>
              <CircleIconContainer onClick={() => setShowAddDialog(false)}>
                <img
                  src={Add}
                  style={{
                    height: '1.8vh',
                    transform: 'rotate(-45deg)',
                  }}
                  alt="Close"
                />
              </CircleIconContainer>
            </DialogHeader>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel>Item Name *</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </FormGroup>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Category *</FormLabel>
                    <FormSelect
                      name="store_category_id"
                      value={formData.store_category_id}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Sub-Category</FormLabel>
                    <FormSelect
                      name="subcategory_id"
                      value={formData.subcategory_id}
                      onChange={handleFormChange}
                      disabled={!formData.store_category_id}
                    >
                      <option value="">Select Sub-Category</option>
                      {filteredSubCategories.map(subCat => (
                        <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
                      ))}
                    </FormSelect>
                  </FormGroup>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Quantity *</FormLabel>
                    <FormInput
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleFormChange}
                      required
                      min="0"
                    />
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Unit *</FormLabel>
                    <FormInput
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleFormChange}
                      required
                    />
                  </FormGroup>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Reorder Threshold *</FormLabel>
                    <FormInput
                      type="number"
                      name="threshold"
                      value={formData.threshold}
                      onChange={handleFormChange}
                      required
                      min="1"
                    />
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Price *</FormLabel>
                    <FormInput
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      required
                      min="0"
                      step="0.01"
                    />
                  </FormGroup>
                </div>

                <FormGroup>
                  <FormLabel>Supplier</FormLabel>
                  <FormInput
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleFormChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Location</FormLabel>
                  <FormInput
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Item Image</FormLabel>
                  <ImageUploadContainer>
                    {imagePreview ? (
                      <label style={{ display: 'contents', cursor: 'pointer' }}>
                        <ImagePreview
                          src={imagePreview}
                          alt="Item Preview"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    ) : (
                      <label style={{ display: 'contents', cursor: 'pointer' }}>
                        <div
                          style={{
                            width: '13vh',
                            height: '13vh',
                            borderRadius: '2vh',
                            backgroundColor: '#fff',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{
                            textAlign: 'center',
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: '0.7vw',
                            letterSpacing: '0.7px'
                          }}>
                            Upload Photo
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}

                    <label style={{
                      display: 'block',
                      marginBottom: '0.6vh',
                      fontFamily: '"Roboto", sans-serif',
                      marginTop: '0.1vh',
                      fontSize: '0.8vw',
                      letterSpacing: '0.7px',
                      color: '#000'
                    }}>
                      Add Item Photo
                    </label>
                  </ImageUploadContainer>
                </FormGroup>

                <DialogActions>
                  <ActionButton
                    type="submit"
                    disabled={addLoading}
                    style={{
                      opacity: addLoading ? 0.7 : 1,
                      cursor: addLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {addLoading ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                        Adding...
                      </div>
                    ) : (
                      'Add Item'
                    )}
                  </ActionButton>
                </DialogActions>
              </form>
            </DialogContent>
          </DialogContainer>
        </DialogOverlay>
      )}

      {/* Edit Item Dialog */}
      {showEditDialog && (
        <DialogOverlay>
          <DialogContainer>
            <DialogHeader>
              <CircleIconContainer onClick={() => setShowEditDialog(false)}>
                <img
                  src={Add}
                  style={{
                    height: '1.8vh',
                    transform: 'rotate(-45deg)',
                  }}
                  alt="Close"
                />
              </CircleIconContainer>
            </DialogHeader>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel>Item Name *</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </FormGroup>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Category *</FormLabel>
                    <FormSelect
                      name="store_category_id"
                      value={formData.store_category_id}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </FormSelect>
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Sub-Category</FormLabel>
                    <FormSelect
                      name="subcategory_id"
                      value={formData.subcategory_id}
                      onChange={handleFormChange}
                      disabled={!formData.store_category_id}
                    >
                      <option value="">Select Sub-Category</option>
                      {filteredSubCategories.map(subCat => (
                        <option key={subCat.id} value={subCat.id}>{subCat.name}</option>
                      ))}
                    </FormSelect>
                  </FormGroup>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Quantity *</FormLabel>
                    <FormInput
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleFormChange}
                      required
                      min="0"
                    />
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Unit *</FormLabel>
                    <FormInput
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleFormChange}
                      required
                    />
                  </FormGroup>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Reorder Threshold *</FormLabel>
                    <FormInput
                      type="number"
                      name="threshold"
                      value={formData.threshold}
                      onChange={handleFormChange}
                      required
                      min="1"
                    />
                  </FormGroup>

                  <FormGroup style={{ flex: 1 }}>
                    <FormLabel>Price *</FormLabel>
                    <FormInput
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      required
                      min="0"
                      step="0.01"
                    />
                  </FormGroup>
                </div>

                <FormGroup>
                  <FormLabel>Supplier</FormLabel>
                  <FormInput
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleFormChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Location</FormLabel>
                  <FormInput
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Item Image</FormLabel>
                  <ImageUploadContainer>
                    {imagePreview ? (
                      <label style={{ display: 'contents', cursor: 'pointer' }}>
                        <ImagePreview
                          src={imagePreview}
                          alt="Item Preview"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    ) : (
                      <label style={{ display: 'contents', cursor: 'pointer' }}>
                        <div
                          style={{
                            width: '13vh',
                            height: '13vh',
                            borderRadius: '2vh',
                            backgroundColor: '#fff',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{
                            textAlign: 'center',
                            fontFamily: '"Roboto", sans-serif',
                            fontSize: '0.7vw',
                            letterSpacing: '0.7px'
                          }}>
                            Upload Photo
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}

                    <label style={{
                      display: 'block',
                      marginBottom: '0.6vh',
                      fontFamily: '"Roboto", sans-serif',
                      marginTop: '0.1vh',
                      fontSize: '0.8vw',
                      letterSpacing: '0.7px',
                      color: '#000'
                    }}>
                      Add Item Photo
                    </label>
                  </ImageUploadContainer>
                </FormGroup>

                <DialogActions>
                  <ActionButton
                    type="submit"
                    disabled={editLoading}
                    style={{
                      opacity: editLoading ? 0.7 : 1,
                      cursor: editLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {editLoading ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Spinner style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                        Saving...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </ActionButton>

                </DialogActions>
              </form>
            </DialogContent>
          </DialogContainer>
        </DialogOverlay>
      )}
      {/* Reorder Report Dialog */}
      {showReorderDialog && (
        <DialogOverlay>
          <ReportDialogContainer>
            <DialogHeader>
              <CircleIconContainer onClick={() => setShowReorderDialog(false)}>
                <img
                  src={Add}
                  style={{
                    height: '1.8vh',
                    transform: 'rotate(-45deg)',
                  }}
                  alt="Close"
                />
              </CircleIconContainer>
            </DialogHeader>
            <DialogContent>
              <ReportSummary>
                <ReportSummaryItem>
                  <ReportSummaryLabel>Total Items:</ReportSummaryLabel>
                  <ReportSummaryValue>{lowStockItems.length}</ReportSummaryValue>
                </ReportSummaryItem>
                <ReportSummaryItem>
                  <ReportSummaryLabel>Low Stock:</ReportSummaryLabel>
                  <ReportSummaryValue>
                    {lowStockItems.filter(item => item.status === 'Low Stock').length}
                  </ReportSummaryValue>
                </ReportSummaryItem>
                <ReportSummaryItem>
                  <ReportSummaryLabel>Out of Stock:</ReportSummaryLabel>
                  <ReportSummaryValue>
                    {lowStockItems.filter(item => item.status === 'Out of Stock').length}
                  </ReportSummaryValue>
                </ReportSummaryItem>
              </ReportSummary>

              <ReportTableContainer>
                <ReportTable>
                  <ReportThead>
                    <ReportTr>
                      <ReportTh>#</ReportTh>
                      <ReportTh>Item Name</ReportTh>
                      <ReportTh>Current Qty</ReportTh>
                      <ReportTh>Threshold</ReportTh>
                      <ReportTh>Status</ReportTh>
                      <ReportTh>Supplier</ReportTh>
                    </ReportTr>
                  </ReportThead>
                  <ReportTbody>
                    {lowStockItems.map((item, index) => (
                      <ReportTr key={item.id} status={item.status}>
                        <ReportTd>{index + 1}</ReportTd>
                        <ReportTd>{item.name}</ReportTd>
                        <ReportTd>{item.quantity} {item.unit}</ReportTd>
                        <ReportTd>{item.threshold}</ReportTd>
                        <ReportTd>
                          <StatusBadge status={item.status}>
                            {item.status}
                          </StatusBadge>
                        </ReportTd>
                        <ReportTd>{item.supplier}</ReportTd>
                      </ReportTr>
                    ))}
                  </ReportTbody>
                </ReportTable>
              </ReportTableContainer>
            </DialogContent>
            <DialogActions style={{ marginLeft: ' 2vw', marginRight: '2vw' }}>
              <ActionButton onClick={generatePDF}>
                Download PDF
              </ActionButton>
            </DialogActions>
          </ReportDialogContainer>
        </DialogOverlay>
      )}
    </Container>
  );
};

export default StoreInventory;