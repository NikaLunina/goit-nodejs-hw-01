import { promises as fs } from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.join('db', "contacts.json");


async function listContacts()  {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};


async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const resultContactById = contacts.find(
      (contact) => contact.id === contactId
    );
    return resultContactById || null;
  } catch (error) {
    console.error(error);
  }
};

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;

    const [deleteContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deleteContact;
  } catch (error) {
    console.error(error);
  }
};

async function addContact(name, email, phone){
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error);
  }
};
export {
  listContacts,    
  getContactById,      
  addContact,
  removeContact,      
};