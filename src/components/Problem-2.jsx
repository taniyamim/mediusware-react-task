import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './index.css'; 

const Problem2 = () => {
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [showUSContacts, setShowUSContacts] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [usContacts, setUSContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlyEvenAllContacts, setOnlyEvenAllContacts] = useState(false);
  const [onlyEvenUSContacts, setOnlyEvenUSContacts] = useState(false);
  const [searchTermAllContacts, setSearchTermAllContacts] = useState('');
  const [searchTermUSContacts, setSearchTermUSContacts] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch('https://contact.mediusware.com/api/contacts/')
      .then((response) => response.json())
      .then((data) => {
        setContacts(data.results);
      })
      .catch((error) => console.error('Error fetching contacts:', error));
  };

  const toggleAllContactsModal = () => {
    setShowAllContacts(!showAllContacts);
    setUSContacts([]);
    setSelectedContact(null);
  };

  const toggleUSContactsModal = () => {
    setShowAllContacts(false);
    setShowUSContacts(!showUSContacts);

    const usContacts = contacts.filter((contact) =>
      contact.country.name === 'United States'
    );
    setUSContacts(usContacts);
    setSelectedContact(null);
  };

  const openContactDetailsModal = (contact) => {
    setShowContactDetails(true);
    setSelectedContact(contact);
  };

  const closeModals = () => {
    setShowAllContacts(false);
    setShowUSContacts(false);
    setShowContactDetails(false);
  };

  const filterContacts = (contactList, onlyEven) => {
    if (onlyEven) {
      return contactList.filter((contact) => contact.id % 2 === 0);
    } else {
      return contactList;
    }
  };

  const handleSearchChangeAllContacts = (event) => {
    const searchTerm = event.target.value;
    setSearchTermAllContacts(searchTerm);
  };

  const handleSearchChangeUSContacts = (event) => {
    const searchTerm = event.target.value;
    setSearchTermUSContacts(searchTerm);
  };

  const filteredAllContacts = filterContacts(
    contacts.filter((contact) =>
      contact.phone.toLowerCase().includes(searchTermAllContacts.toLowerCase())
    ),
    onlyEvenAllContacts
  );

  const filteredUSContacts = filterContacts(
    usContacts.filter((contact) =>
      contact.phone.toLowerCase().includes(searchTermUSContacts.toLowerCase())
    ),
    onlyEvenUSContacts
  );

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary btn-contact-color"
            type="button"
            onClick={toggleAllContactsModal}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={toggleUSContactsModal}
          >
            US Contacts
          </button>
        </div>
      </div>
      <Modal show={showAllContacts} onHide={closeModals} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>All Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            <input
              type="checkbox"
              checked={onlyEvenAllContacts}
              onChange={() => setOnlyEvenAllContacts(!onlyEvenAllContacts)}
            />
            Only even contacts
          </label>
          <input
            type="text"
            placeholder="Search..."
            value={searchTermAllContacts}
            onChange={handleSearchChangeAllContacts}
          />
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Phone</th>
                <th>Country Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredAllContacts.map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => openContactDetailsModal(contact)}
                  className="clickable-row"
                >
                  <td>{contact.id}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.country.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModals}>
            Close
          </Button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={toggleUSContactsModal}
          >
            US Contacts
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUSContacts} onHide={closeModals} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>US Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            <input
              type="checkbox"
              checked={onlyEvenUSContacts}
              onChange={() => setOnlyEvenUSContacts(!onlyEvenUSContacts)}
            />
            Only even contacts
          </label>
          <input
            type="text"
            placeholder="Search..."
            value={searchTermUSContacts}
            onChange={handleSearchChangeUSContacts}
          />
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Phone</th>
                <th>Country Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredUSContacts.map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => openContactDetailsModal(contact)}
                  className="clickable-row"
                >
                  <td>{contact.id}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.country.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModals}>
            Close
          </Button>
          <button
            className="btn btn-lg btn-outline-primary btn-contact-color"
            type="button"
            onClick={toggleAllContactsModal}
          >
            All Contacts
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showContactDetails} onHide={closeModals} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <div>
              <p>ID: {selectedContact.id}</p>
              <p>Phone: {selectedContact.phone}</p>
              <p>Country Name: {selectedContact.country.name}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModals}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Problem2;
