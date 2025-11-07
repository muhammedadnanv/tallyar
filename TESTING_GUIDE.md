# 🧪 Tallyar Platform Testing Guide

## Overview
Comprehensive testing procedures for ensuring platform stability and functionality.

---

## 🎯 Testing Priorities

### Priority 1: CRITICAL (Must Pass)
- User authentication
- Invoice/receipt generation
- POS quick sale
- Product management
- Database operations

### Priority 2: HIGH (Should Pass)
- Mobile responsiveness
- PDF generation
- History management
- Search functionality

### Priority 3: MEDIUM (Nice to Have)
- Keyboard shortcuts
- UI animations
- Toast notifications

---

## 🔐 Authentication Testing

### Test Case 1.1: Sign Up
**Steps:**
1. Navigate to `/auth`
2. Click "Don't have an account? Sign up"
3. Enter email: `test@example.com`
4. Enter password: `Test123!`
5. Click "Sign Up"

**Expected Result:**
- ✅ Success toast appears
- ✅ Form switches to login mode
- ✅ Can login with new credentials
- ✅ Redirects to homepage after login

**Failure Conditions:**
- ❌ Error toast appears
- ❌ Email already exists error
- ❌ Password validation fails

---

### Test Case 1.2: Login
**Steps:**
1. Navigate to `/auth`
2. Enter valid email
3. Enter valid password
4. Click "Login"

**Expected Result:**
- ✅ Success toast appears
- ✅ Redirects to homepage
- ✅ User menu shows "Logout" button
- ✅ Protected routes accessible

---

### Test Case 1.3: Logout
**Steps:**
1. While logged in, click "Logout" button
2. Verify redirect

**Expected Result:**
- ✅ Redirected to homepage
- ✅ User menu shows "Login" button
- ✅ Protected routes redirect to `/auth`

---

### Test Case 1.4: Session Persistence
**Steps:**
1. Login to account
2. Refresh page
3. Close and reopen browser
4. Return to app

**Expected Result:**
- ✅ User remains logged in after refresh
- ✅ User remains logged in after browser restart (within session timeout)

---

## 📄 Invoice Testing

### Test Case 2.1: Create Invoice
**Steps:**
1. Navigate to `/create-invoice`
2. Fill in all required fields:
   - Company Name: "Test Corp"
   - Invoice Number: "INV-001"
   - Invoice Date: Today's date
   - Bill To Name: "John Doe"
   - Add item: "Service" @ $100.00
3. Click "Generate Invoice"

**Expected Result:**
- ✅ Navigates to template page
- ✅ Invoice displays correctly
- ✅ All data populated
- ✅ Calculations correct

---

### Test Case 2.2: Save Invoice
**Steps:**
1. Create invoice (Test 2.1)
2. Click "Save" button
3. Check History page

**Expected Result:**
- ✅ Success toast appears
- ✅ Invoice appears in history
- ✅ Data matches input

**Requires:** User must be logged in

---

### Test Case 2.3: Download PDF
**Steps:**
1. Create invoice (Test 2.1)
2. Click "Download PDF"
3. Wait for download

**Expected Result:**
- ✅ PDF downloads successfully
- ✅ PDF contains correct data
- ✅ PDF is properly formatted
- ✅ Images/logos included

---

### Test Case 2.4: Print Invoice
**Steps:**
1. Create invoice (Test 2.1)
2. Click "Print" button
3. Verify print preview

**Expected Result:**
- ✅ Print dialog opens
- ✅ Preview shows correct formatting
- ✅ No UI elements (buttons, etc.) in print view

---

## 🛒 POS Testing

### Test Case 3.1: Access POS
**Steps:**
1. Login to account
2. Navigate to `/pos-quick-sale`

**Expected Result:**
- ✅ POS interface loads
- ✅ Product list visible
- ✅ Empty cart displayed
- ✅ Search input focused

**Requires:** User logged in, products exist in database

---

### Test Case 3.2: Product Search
**Steps:**
1. Access POS (Test 3.1)
2. Type product name in search
3. Verify filtering

**Expected Result:**
- ✅ Products filter in real-time
- ✅ Matches by name, SKU, barcode
- ✅ Case-insensitive search

---

### Test Case 3.3: Add to Cart
**Steps:**
1. Access POS (Test 3.1)
2. Click on product card
3. Verify cart updates

**Expected Result:**
- ✅ Product appears in cart
- ✅ Quantity = 1
- ✅ Price displayed correctly
- ✅ Success toast appears
- ✅ Search clears automatically

---

### Test Case 3.4: Update Quantity
**Steps:**
1. Add product to cart (Test 3.3)
2. Click "+" button
3. Click "-" button

**Expected Result:**
- ✅ Quantity increases by 1
- ✅ Quantity decreases by 1
- ✅ Subtotal updates
- ✅ Cannot go below 0

---

### Test Case 3.5: Remove from Cart
**Steps:**
1. Add product to cart (Test 3.3)
2. Click trash icon
3. Verify removal

**Expected Result:**
- ✅ Item removed from cart
- ✅ Success toast appears
- ✅ Cart count updates

---

### Test Case 3.6: Complete Sale
**Steps:**
1. Add multiple products to cart
2. Verify totals are correct
3. Click "Complete Sale (F9)"

**Expected Result:**
- ✅ Navigates to receipt page
- ✅ Receipt displays all cart items
- ✅ Calculations correct (subtotal, tax, total)
- ✅ Success toast appears

---

### Test Case 3.7: Keyboard Shortcuts
**Steps:**
1. Access POS
2. Press F2
3. Press F9 (with items in cart)
4. Press ESC (with items in cart)

**Expected Result:**
- ✅ F2: Search input focuses
- ✅ F9: Completes sale
- ✅ ESC: Shows clear cart confirmation

**Note:** Desktop only

---

## 📦 Product Management Testing

### Test Case 4.1: View Products
**Steps:**
1. Login to account
2. Navigate to `/products`

**Expected Result:**
- ✅ Product list loads
- ✅ All products visible
- ✅ Search bar present
- ✅ "Add Product" button visible

---

### Test Case 4.2: Add Product
**Steps:**
1. Navigate to `/products`
2. Click "Add Product"
3. Fill in form:
   - Name: "Test Product"
   - Price: 99.99
   - SKU: "TEST-001"
   - Stock: 100
4. Click "Create"

**Expected Result:**
- ✅ Success toast appears
- ✅ Dialog closes
- ✅ Product appears in list
- ✅ All data saved correctly

---

### Test Case 4.3: Edit Product
**Steps:**
1. Navigate to `/products`
2. Click edit icon on product
3. Change name to "Updated Product"
4. Click "Update"

**Expected Result:**
- ✅ Success toast appears
- ✅ Dialog closes
- ✅ Product name updated in list

---

### Test Case 4.4: Delete Product
**Steps:**
1. Navigate to `/products`
2. Click delete icon
3. Confirm deletion

**Expected Result:**
- ✅ Confirmation dialog appears
- ✅ After confirm: success toast
- ✅ Product removed from list

---

### Test Case 4.5: Product Search
**Steps:**
1. Navigate to `/products`
2. Type product name in search
3. Try searching by SKU
4. Try searching by barcode

**Expected Result:**
- ✅ Filters in real-time
- ✅ Matches name, SKU, barcode
- ✅ Case-insensitive

---

## 📱 Mobile Testing

### Test Case 5.1: Mobile Responsiveness
**Test on iPhone and Android:**

**Steps:**
1. Access homepage on mobile
2. Verify layout
3. Test navigation
4. Create invoice
5. Use POS
6. Manage products

**Expected Result:**
- ✅ All pages responsive
- ✅ No horizontal scroll
- ✅ Touch targets ≥ 44px
- ✅ Buttons fully clickable
- ✅ Forms usable
- ✅ Safe area insets work (notched phones)

---

### Test Case 5.2: PWA Installation
**Steps:**
1. Access app in mobile Safari/Chrome
2. Tap "Add to Home Screen"
3. Open installed app
4. Test basic functionality

**Expected Result:**
- ✅ App installs successfully
- ✅ Custom icon displays
- ✅ Splash screen shows
- ✅ Runs in standalone mode
- ✅ Basic offline capabilities

---

### Test Case 5.3: Touch Interactions
**Steps:**
1. Test all buttons on mobile
2. Test form inputs
3. Test dropdowns/selects
4. Test dialogs/modals

**Expected Result:**
- ✅ All interactive elements respond to touch
- ✅ No accidental zoom on input focus
- ✅ Smooth scrolling
- ✅ No tap delay

---

## 🔍 History Testing

### Test Case 6.1: View History
**Steps:**
1. Login to account
2. Click "History" button
3. View invoices tab
4. View receipts tab

**Expected Result:**
- ✅ All saved items displayed
- ✅ Sorted by creation date (newest first)
- ✅ Correct counts shown
- ✅ Data accurate

---

### Test Case 6.2: Edit from History
**Steps:**
1. Navigate to History
2. Click edit icon on item
3. Modify data
4. Save changes

**Expected Result:**
- ✅ Navigates to edit view
- ✅ Form pre-populated
- ✅ Changes save successfully
- ✅ History updates

---

### Test Case 6.3: Delete from History
**Steps:**
1. Navigate to History
2. Click delete icon
3. Confirm deletion

**Expected Result:**
- ✅ Confirmation dialog appears
- ✅ Item deleted successfully
- ✅ Success toast appears
- ✅ List updates

---

## 🐛 Bug Reporting Template

When a test fails, document using this format:

```
**Test Case:** [Test Case Number/Name]
**Date:** [Date]
**Tester:** [Your Name]
**Browser/Device:** [Chrome 120 / iPhone 14 Pro]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:**


**Actual Result:**


**Screenshots/Logs:**
[Attach console logs, screenshots]

**Severity:** [Critical/High/Medium/Low]
**Priority:** [P1/P2/P3]
```

---

## 📊 Test Coverage Summary

| Module | Test Cases | Priority |
|--------|------------|----------|
| Authentication | 4 | P1 |
| Invoices | 4 | P1 |
| POS | 7 | P1 |
| Products | 5 | P1 |
| Mobile | 3 | P2 |
| History | 3 | P2 |

**Total Test Cases:** 26  
**Estimated Testing Time:** 2-3 hours for full suite

---

## ✅ Sign-Off Checklist

Before approving for production:

- [ ] All P1 tests passed
- [ ] All P2 tests passed
- [ ] No critical bugs
- [ ] Mobile testing completed
- [ ] Cross-browser testing completed
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Documentation updated

**Tested By:** _______________  
**Date:** _______________  
**Approved By:** _______________  
**Date:** _______________

---

**Last Updated**: 2025-11-07
