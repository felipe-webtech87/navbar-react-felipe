import { useState } from 'react'
import styles from "../../styles/Contact.module.css"
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Contact = () => {
  const {t} = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      console.log('Form submitted:', formData)
      alert('Form submitted')
    } catch (error) {
      console.log('Error sendind data:', error);
      alert('Form not sent')
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    })
  };

  return (
    <section id='contact' className={styles.contact}>
      <h1>{t('contact')}</h1>
      <h4>{t('contact_subtitle')}</h4>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_fields}>
          <label className={styles.label}>{t('name')}:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.form_fields}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.form_fields}>
        <label className={styles.label}>{t('phone')}:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.form_fields}>
          <label className={styles.label}>{t('message')}:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.send} onClick={handleSubmit}>{t('send')}</button>
      </form>
    </section>
    
  );
}

export default Contact
