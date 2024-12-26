import React, { useState } from "react";
import { Card,  Grid, TextField, MenuItem, Button, Typography } from "@mui/material";
import SoftBox from "components/SoftBox";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SoftTypography from "components/SoftTypography";
import "layouts/TextareaStyles.css";

const PatientDetailsForm = () => {
    const [patientData, setPatientData] = useState({
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      patientType: "",
      id: "",
      patientStatus: "",
      dataResponsible: "",
      birthCity: "",
      birthState: "",
      nationality: "",
      idType: "",
      idNumber: "",
      phone: "",
      email: "",
      additionalPhone: "",
      address: {
        street: "",
        number: "",
        postalCode: "",
        neighborhood: "",
        city: "",
        state: "",
        country: "",
      },
      relatedPersons: [],
      authorizedPerson: '',
      legalRepresentative: '',
      religion: "",
      maritalStatus: "",
      education: "",
      profession: "",
      consent: false,
      sendReminders: false,
    });
    const [relatedPersons, setRelatedPersons] = useState([]);
    const [authorizedPerson, setAuthorizedPerson] = useState('');
    const [legalRepresentative, setLegalRepresentative] = useState('');
    const [showAuthorizedDropdown, setShowAuthorizedDropdown] = useState(false);
    const [showRepresentativeDropdown, setShowRepresentativeDropdown] = useState(false);
    const handleAddRelatedPerson = () => {
        const newRelatedPersons = [...patientData.relatedPersons, { name: '', relation: '', profession: '' }];
        setPatientData({ ...patientData, relatedPersons: newRelatedPersons });
      };
      
      const handleRelatedPersonChange = (index, field, value) => {
        const updatedPersons = [...patientData.relatedPersons];
        updatedPersons[index][field] = value;
        setPatientData({ ...patientData, relatedPersons: updatedPersons });
      };
      

      const handleAuthorizedPersonChange = (value) => {
        setPatientData({ ...patientData, authorizedPerson: value });
      };
      
      const handleLegalRepresentativeChange = (value) => {
        setPatientData({ ...patientData, legalRepresentative: value });
      };
      
      
      const handleCheckboxChange = (checkboxType) => {
        if (checkboxType === 'authorized') {
          setShowAuthorizedDropdown(!showAuthorizedDropdown);
        } else if (checkboxType === 'representative') {
          setShowRepresentativeDropdown(!showRepresentativeDropdown);
        }
      };
      const handleRemoveRelatedPerson = (index) => {
  const updatedPersons = relatedPersons.filter((_, i) => i !== index);
  setRelatedPersons(updatedPersons);
};

          
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
          setPatientData({
            ...patientData,
            [name]: checked, 
          });
        } else {
          setPatientData({
            ...patientData,
            [name]: value,
          });
        }
      };
      
  
    
      const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setPatientData({
          ...patientData,
          address: {
            ...patientData.address,
            [name]: value,
          },
        });
      };
    
  
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Generar el objeto JSON con los datos
        const jsonData = {
          firstName: patientData.firstName,
          lastName: patientData.lastName,
          birthDate: patientData.birthDate,
          gender: patientData.gender,
          patientType: patientData.patientType,
          id: patientData.id,
          patientStatus: patientData.patientStatus,
          dataResponsible: patientData.dataResponsible,
          birthCity: patientData.birthCity,
          birthState: patientData.birthState,
          nationality: patientData.nationality,
          idType: patientData.idType,
          idNumber: patientData.idNumber,
          phone: patientData.phone,
          email: patientData.email,
          additionalPhone: patientData.additionalPhone,
          address: patientData.address,
          religion: patientData.religion,
          maritalStatus: patientData.maritalStatus,
          education: patientData.education,
          profession: patientData.profession,
          consent: patientData.consent,
          sendReminders: patientData.sendReminders,
          relatedPersons: patientData.relatedPersons,
    authorizedPerson: patientData.authorizedPerson,
    legalRepresentative: patientData.legalRepresentative,
        };
    
        // Mostrar el JSON en consola
        console.log("JSON generado: ", JSON.stringify(jsonData, null, 2));
      };

  return (
    <Card style={{ padding: "35px" }}>


      <form onSubmit={handleSubmit}>
        
        <Typography variant="h5" gutterBottom>
            Datos generales del paciente
            </Typography>
            <Grid container spacing={2}>
            {/* Nombre */}
            <Grid item xs={12} sm={6}>
                <label htmlFor="firstName">Nombre*</label>
                <textarea
                id="firstName"
                name="firstName"
                value={patientData.firstName}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
                />
            </Grid>

            {/* Apellidos */}
            <Grid item xs={12} sm={6}>
                <label htmlFor="lastName">Apellidos*</label>
                <textarea
                id="lastName"
                name="lastName"
                value={patientData.lastName}
                onChange={handleChange}
                rows="1"
                className="global-textarea"
                />
            </Grid>

            {/* Fecha de nacimiento */}
            <Grid item xs={12} sm={6}>
                <TextField
                fullWidth
                type="date"
                label="Fecha de nacimiento (DD/MM/AAAA)"
                name="birthDate"
                InputLabelProps={{ shrink: true }}
                value={patientData.birthDate}
                onChange={handleChange}
                variant="outlined"
                />
            </Grid>

            {/* Género */}
            <Grid item xs={12} sm={6}>
                <TextField
                select
                fullWidth
                label="Género"
                name="gender"
                value={patientData.gender}
                onChange={handleChange}
                variant="outlined"
                >
                <MenuItem value="">Selecciona una opción</MenuItem>
                <MenuItem value="male">Masculino</MenuItem>
                <MenuItem value="female">Femenino</MenuItem>
                <MenuItem value="other">Otro</MenuItem>
                </TextField>
            </Grid>

            {/* Tipo de paciente */}
            <Grid item xs={12}>
                <Typography variant="subtitle1">Tipo de paciente</Typography>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <label>
                    <input
                    type="radio"
                    name="patientType"
                    value="private"
                    checked={patientData.patientType === "private"}
                    onChange={handleChange}
                    />
                    Privado
                </label>
                <label>
                    <input
                    type="radio"
                    name="patientType"
                    value="insured"
                    checked={patientData.patientType === "insured"}
                    onChange={handleChange}
                    />
                    De aseguradora
                </label>
                </div>
            </Grid>

      
           
            <Typography variant="h5" gutterBottom>
                Datos administrativos
            </Typography>
            <Grid container spacing={2}>
                {/* ID */}
                <Grid item xs={12} sm={6}>
                <label htmlFor="id">ID</label>
                <textarea
                    id="id"
                    name="id"
                    value={patientData.id}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"

                />
                </Grid>

                {/* Estado del paciente */}
                <Grid item xs={12} sm={6}>
                <label htmlFor="patientStatus">Estado del paciente</label>
                <select
                    id="patientStatus"
                    name="patientStatus"
                    value={patientData.patientStatus}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px'
                        }}

                >
                    <option value="">Selecciona una opción</option>
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                </select>
                </Grid>

                
                <Grid item xs={12}>
                <label htmlFor="dataResponsible">
                    Responsable del tratamiento de datos de paciente
                </label>
                <textarea
                    id="dataResponsible"
                    name="dataResponsible"
                    value={patientData.dataResponsible}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                />
                </Grid>

                {/* Ciudad de nacimiento */}
                <Grid item xs={12} sm={6}>
                <label htmlFor="birthCity">Ciudad de nacimiento</label>
                <textarea
                    id="birthCity"
                    name="birthCity"
                    value={patientData.birthCity}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                />
                </Grid>

                {/* Nacionalidad */}
                <Grid item xs={12} sm={6}>
                <label htmlFor="nationality">Nacionalidad</label>
                <textarea
                    id="nationality"
                    name="nationality"
                    value={patientData.nationality}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                />
                </Grid>

                {/* Estado de nacimiento */}
                <Grid item xs={12}>
                <label htmlFor="birthState">Estado de nacimiento</label>
                <textarea
                    id="birthState"
                    name="birthState"
                    value={patientData.birthState}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                />
                </Grid>

                {/* Tipo de identificación */}
                <Grid item xs={12} sm={6}>
                <label htmlFor="idType">Tipo de identificación</label>
                <select
                    id="idType"
                    name="idType"
                    value={patientData.idType}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px'
                        }}
                  
                >
                    <option value="CURP">CURP</option>
                    <option value="INE">INE</option>
                    <option value="PASAPORTE">Pasaporte</option>
                </select>
                </Grid>

                {/* Número de identificación */}
                <Grid item xs={12} sm={6}>
                <label htmlFor="idNumber">Número de identificación</label>
                <textarea
                    id="idNumber"
                    name="idNumber"
                    value={patientData.idNumber}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                />
                </Grid>

                {/* Consentimiento */}
                <Grid item xs={12}>
                <label>
                    <input
                    type="checkbox"
                    name="consent"
                    checked={patientData.consent}
                    onChange={handleChange}
                    />
                    <span style={{ marginLeft: '8px' }}>
                    Consentimiento para el tratamiento de sus datos para fines sanitarios firmado.
                    </span>
                </label>
                </Grid>
            </Grid>
           
            <Typography variant="h5" gutterBottom>
                Datos de contacto
                <Typography variant="body2" gutterBottom>
                Estos contactos se usarán para las notificaciones, mensajes y otras comunicaciones.
                </Typography>
            </Typography>
            
            <Grid container spacing={2}>
                {/* Teléfono */}
                <Grid item xs={12} sm={6}>
                <label htmlFor="phone">Teléfono</label>
                <textarea
                    id="phone"
                    name="phone"
                    value={patientData.phone}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"

                />
                </Grid>

                {/* Email */}
                <Grid item xs={12} sm={6}>
                <label htmlFor="email">Email</label>
                <textarea
                    id="email"
                    name="email"
                    value={patientData.email}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                    
                />
                </Grid>

                {/* Teléfono adicional */}
                <Grid item xs={12} sm={6}>
                <label htmlFor="additionalPhone">Teléfono adicional</label>
                <textarea
                    id="additionalPhone"
                    name="additionalPhone"
                    value={patientData.additionalPhone}
                    onChange={handleChange}
                    rows="1"
                    className="global-textarea"
                    
                />
                </Grid>

                {/* Checkbox de recordatorios */}
                <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                    type="checkbox"
                    name="sendReminders"
                    checked={patientData.sendReminders}
                    onChange={handleChange}
                    style={{ marginRight: '8px' }}
                    />
                    Enviar recordatorios a este teléfono también
                </label>
                </Grid>

                {/* Calle */}
                <Grid item xs={12} sm={4}>
                <label htmlFor="street">Calle</label>
                <textarea
                    id="street"
                    name="street"
                    value={patientData.address.street}
                    onChange={handleAddressChange}
                    rows="1"
                    className="global-textarea"
                   
                />
                </Grid>

                {/* Número */}
                <Grid item xs={12} sm={4}>
                <label htmlFor="number">Número</label>
                <textarea
                    id="number"
                    name="number"
                    value={patientData.address.number}
                    onChange={handleAddressChange}
                    rows="1"
                    className="global-textarea"
                    
                />
                </Grid>

                {/* Código Postal */}
                <Grid item xs={12} sm={4}>
                <label htmlFor="postalCode">Código postal</label>
                <textarea
                    id="postalCode"
                    name="postalCode"
                    value={patientData.address.postalCode}
                    onChange={handleAddressChange}
                    rows="1"
                    className="global-textarea"
                    
                />
                </Grid>

                {/* Colonia */}
                <Grid item xs={12} sm={4}>
                <label htmlFor="neighborhood">Colonia</label>
                <textarea
                    id="neighborhood"
                    name="neighborhood"
                    value={patientData.address.neighborhood}
                    onChange={handleAddressChange}
                    rows="1"
                    className="global-textarea"
                    
                />
                </Grid>

                {/* Ciudad */}
                <Grid item xs={12} sm={4}>
                <label htmlFor="city">Ciudad</label>
                <textarea
                    id="city"
                    name="city"
                    value={patientData.address.city}
                    onChange={handleAddressChange}
                    rows="1"
                    className="global-textarea"
                   
                />
                </Grid>

                {/* Estado */}
                <Grid item xs={12} sm={4}>
                <label htmlFor="state">Estado</label>
                <select
                    id="state"
                    name="state"
                    value={patientData.address.state}
                    onChange={handleAddressChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                    <option value="">Selecciona un estado</option>
                    <option value="Aguascalientes">Aguascalientes</option>
                    <option value="Baja California">Baja California</option>
                    <option value="Baja California Sur">Baja California Sur</option>
                    <option value="Campeche">Campeche</option>
                    <option value="Chiapas">Chiapas</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Ciudad de México">Ciudad de México</option>
                    <option value="Coahuila">Coahuila</option>
                    <option value="Colima">Colima</option>
                    <option value="Durango">Durango</option>
                    <option value="Estado de México">Estado de México</option>
                    <option value="Guanajuato">Guanajuato</option>
                    <option value="Guerrero">Guerrero</option>
                    <option value="Hidalgo">Hidalgo</option>
                    <option value="Jalisco">Jalisco</option>
                    <option value="Michoacán">Michoacán</option>
                    <option value="Morelos">Morelos</option>
                    <option value="Nayarit">Nayarit</option>
                    <option value="Nuevo León">Nuevo León</option>
                    <option value="Oaxaca">Oaxaca</option>
                    <option value="Puebla">Puebla</option>
                    <option value="Querétaro">Querétaro</option>
                    <option value="Quintana Roo">Quintana Roo</option>
                    <option value="San Luis Potosí">San Luis Potosí</option>
                    <option value="Sinaloa">Sinaloa</option>
                    <option value="Sonora">Sonora</option>
                    <option value="Tabasco">Tabasco</option>
                    <option value="Tamaulipas">Tamaulipas</option>
                    <option value="Tlaxcala">Tlaxcala</option>
                    <option value="Veracruz">Veracruz</option>
                    <option value="Yucatán">Yucatán</option>
                    <option value="Zacatecas">Zacatecas</option>
                </select>
                </Grid>

                {/* País */}
                <Grid item xs={12} sm={4}>
                <label htmlFor="country">País</label>
                <textarea
                    id="country"
                    name="country"
                    value={patientData.address.country}
                    onChange={handleAddressChange}
                    rows="1"
                    className="global-textarea"
                   
                />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                    <Typography variant="h6">Personas allegadas</Typography>
                    <Typography variant="body2">
                    Las personas allegadas pueden seleccionarse como personas autorizadas o representantes legales de este paciente.
                    </Typography>
                </Grid>

                {/* Lista de personas allegadas */}
                {relatedPersons.map((person, index) => (
                    <Grid container spacing={2} key={index}>
                    <Grid item xs={12} sm={4}>
                        <label htmlFor={`name-${index}`}>Nombre y Apellidos</label>
                        <textarea
                        id={`name-${index}`}
                        name={`name-${index}`}
                        value={person.name}
                        onChange={(e) => handleRelatedPersonChange(index, 'name', e.target.value)}
                        rows="1"
                        className="global-textarea"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <label htmlFor={`relation-${index}`}>Relación</label>
                        <textarea
                        id={`relation-${index}`}
                        name={`relation-${index}`}
                        value={person.relation}
                        onChange={(e) => handleRelatedPersonChange(index, 'relation', e.target.value)}
                        rows="1"
                        className="global-textarea"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <label htmlFor={`profession-${index}`}>Profesión</label>
                        <textarea
                        id={`profession-${index}`}
                        name={`profession-${index}`}
                        value={person.profession}
                        onChange={(e) => handleRelatedPersonChange(index, 'profession', e.target.value)}
                        rows="1"
                        className="global-textarea"
                        />
                    </Grid>
                    </Grid>
                ))}

                {/* Botón para agregar personas allegadas */}
                <Grid item xs={12}>
                    <Button onClick={handleAddRelatedPerson} style={{ color: '#1976d2', textTransform: 'none' }}>
                    + Agregar persona allegada
                    </Button>
                </Grid>

                {/* Opciones de selección */}
                <Grid item xs={12}>
                    <label>
                    <input
                        type="checkbox"
                        checked={showAuthorizedDropdown}
                        onChange={() => handleCheckboxChange('authorized')}
                        style={{ marginRight: '8px' }}
                    />
                    El paciente autoriza a esta persona a acceder a sus datos médicos
                    </label>
                    {showAuthorizedDropdown && (
                    <>
                        <Typography variant="body2">Persona autorizada</Typography>
                        {relatedPersons.length > 0 ? (
                            <select
                            value={patientData.authorizedPerson}
                            onChange={(e) => handleAuthorizedPersonChange(e.target.value)}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                            >
                            <option value="">Elija una persona autorizada</option>
                            {patientData.relatedPersons.map((person, index) => (
                                <option key={index} value={person.name}>
                                {person.name}
                                </option>
                            ))}
                            </select>
                        ) : (
                        <Typography variant="body2" color="error">
                            Primero debes agregar una persona.
                        </Typography>
                        )}
                    </>
                    )}
                </Grid>

                <Grid item xs={12}>
                    <label>
                    <input
                        type="checkbox"
                        checked={showRepresentativeDropdown}
                        onChange={() => handleCheckboxChange('representative')}
                        style={{ marginRight: '8px' }}
                    />
                    El paciente es menor de edad o no tiene capacidad legal
                    </label>
                    {showRepresentativeDropdown && (
                    <>
                        <Typography variant="body2">Representante legal</Typography>
                        {relatedPersons.length > 0 ? (
                            <select
                                value={patientData.legalRepresentative}
                                onChange={(e) => handleLegalRepresentativeChange(e.target.value)}
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                >
                                <option value="">Elija un representante legal</option>
                                {patientData.relatedPersons.map((person, index) => (
                                    <option key={index} value={person.name}>
                                    {person.name}
                                    </option>
                                ))}
                                </select>
                        ) : (
                        <Typography variant="body2" color="error">
                            Primero debes agregar una persona.
                        </Typography>   
                        )}
                    </>
                    )}
                </Grid>
                <Typography variant="h5" gutterBottom>
                    Datos complementarios
                    <Typography variant="body2" gutterBottom>
                    Proporciona información adicional relevante para el perfil del paciente.
                    </Typography>
                </Typography>

                <Grid container spacing={2}>
                    {/* Religión */}
                    <Grid item xs={12} sm={6}>
                    <label htmlFor="religion">Religión</label>
                    <textarea
                        id="religion"
                        name="religion"
                        value={patientData.religion}
                        onChange={handleChange}
                        rows="1"
                        className="global-textarea"
                        
                    />
                    </Grid>

                    {/* Estado Civil */}
                    <Grid item xs={12} sm={6}>
                    <label htmlFor="maritalStatus">Estado civil</label>
                    <select
                        id="maritalStatus"
                        name="maritalStatus"
                        value={patientData.maritalStatus}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '14px'
                            }}
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="single">Soltero(a)</option>
                        <option value="married">Casado(a)</option>
                        <option value="divorced">Divorciado(a)</option>
                        <option value="widowed">Viudo(a)</option>
                    </select>
                    </Grid>

                    {/* Educación */}
                    <Grid item xs={12} sm={6}>
                    <label htmlFor="education">Educación</label>
                    <select
                        id="education"
                        name="education"
                        value={patientData.education}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '14px'
                            }}
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="primary">Primaria</option>
                        <option value="secondary">Secundaria</option>
                        <option value="highschool">Preparatoria</option>
                        <option value="university">Universidad</option>
                    </select>
                    </Grid>

                    {/* Profesión */}
                    <Grid item xs={12} sm={6}>
                    <label htmlFor="profession">Profesión</label>
                    <textarea
                        id="profession"
                        name="profession"
                        value={patientData.profession}
                        onChange={handleChange}
                        rows="1"
                        className="global-textarea"
                        
                    />
                    </Grid>
                </Grid>
                
            </Grid>
            <SoftBox mt={2}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ color: "white" }}
                onClick={handleSubmit}
            >
                guardar
            </Button>
            </SoftBox>
        </form>
    </Card>
  );
}
export default PatientDetailsForm;
