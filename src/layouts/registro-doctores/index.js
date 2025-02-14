import React, { useState } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Table from 'examples/Tables/Table';
import doctorsTableData from './doctorsTableData';
import { registerDoctor } from './apiService';
import { apiConsult } from './apiConsult';
import { apiUpdate } from './apiUpdate';
import { deleteDoctor } from './apiDelete';
import {
    Container,
    Card,
    CardContent,
    Grid,
    TextField,
    FormControl,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Button,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material';

function DoctorRegistrationForm() {

    const { columns, rows } = doctorsTableData();

    const [formValues, setFormValues] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        neighborhood: '',
        nationality: '',
        category: '',
        role: '',
        password: '',
        confirmPassword: ''
    });

    const [schedule, setSchedule] = useState({
        mondayFriday: { works: false, start: '', end: '' },
        saturday: { works: false, start: '', end: '' },
        sunday: { works: false, start: '', end: '' }
    });

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [openAlert, setOpenAlert] = useState(false);

    // Manejo de cambios en los inputs del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    // Manejo de cambios en el horario
    const handleScheduleChange = (day, field, value) => {
        setSchedule((prev) => ({
            ...prev,
            [day]: { ...prev[day], [field]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí se puede realizar la validación y el envío a la API
        const formData = {
            ...formValues,
            schedule
        };

        console.log("📋 Form Data Sent:", JSON.stringify(formData, null, 2));

        try {
            const response = await registerDoctor(formData);
            setAlertMessage("✅ Médico registrado con éxito");
            setAlertType("success");
            console.log("📋 Respuesta API:", response);

            setFormValues({
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                postalCode: '',
                neighborhood: '',
                nationality: '',
                category: '',
                role: '',
                password: '',
                confirmPassword: ''
            });
            setSchedule({
                mondayFriday: { works: false, start: '', end: '' },
                saturday: { works: false, start: '', end: '' },
                sunday: { works: false, start: '', end: '' }
            });

        } catch (error) {
            setAlertMessage("❌ Error al registrar el médico");
            setAlertType("error");
        } finally {
            setOpenAlert(true); // Mostrar la alerta
        }
    };

    const handleConsultDoctor = async () => {
        if (!formValues.id.trim()) {
            setAlertMessage("Ingrese un ID de médico para consultar.");
            setAlertType("warning");
            setOpenAlert(true);
            return;
        }

        try {
            const doctorData = await apiConsult(formValues.id);

            setFormValues((prevValues) => ({
                ...prevValues,
                firstName: doctorData.firstName || "",
                lastName: doctorData.lastName || "",
                email: doctorData.email || "",
                phone: doctorData.phone || "",
                address: doctorData.address || "",
                city: doctorData.city || "",
                postalCode: doctorData.postalCode || "",
                neighborhood: doctorData.neighborhood || "",
                nationality: doctorData.nationality || "",
                category: doctorData.category || "",
                role: doctorData.role || ""
            }));
            setSchedule({
                mondayFriday: {
                    works: doctorData.schedule?.mondayFriday?.works ?? false,
                    start: doctorData.schedule?.mondayFriday?.start || "",
                    end: doctorData.schedule?.mondayFriday?.end || ""
                },
                saturday: {
                    works: doctorData.schedule?.saturday?.works ?? false,
                    start: doctorData.schedule?.saturday?.start || "",
                    end: doctorData.schedule?.saturday?.end || ""
                },
                sunday: {
                    works: doctorData.schedule?.sunday?.works ?? false,
                    start: doctorData.schedule?.sunday?.start || "",
                    end: doctorData.schedule?.sunday?.end || ""
                }
            });

            setAlertMessage("✅ Médico encontrado.");
            setAlertType("success");
        } catch (error) {
            setAlertMessage("❌ No se encontró el médico.");
            setAlertType("error");
        } finally {
            setOpenAlert(true);
        }
    };

    const handleUpdateDoctor = async () => {
        if (!formValues.id.trim()) {
            setAlertMessage("⚠️ Ingrese un ID de médico para actualizar.");
            setAlertType("warning");
            setOpenAlert(true);
            return;
        }

        const updatedData = {
            ...formValues,
            schedule
        };

        try {
            await apiUpdate(formValues.id, updatedData);

            setAlertMessage("✅ Médico actualizado con éxito.");
            setAlertType("success");
        } catch (error) {
            setAlertMessage("❌ Error al actualizar el médico.");
            setAlertType("error");
        } finally {
            setOpenAlert(true);
        }
    };

    const handleDeleteDoctor = async () => {
        try {
            const response = await deleteDoctor(formValues.id);
            setAlertMessage("✅ Médico eliminado con éxito");
            setAlertType("success");
            setOpenAlert(true);
            console.log("📋 Respuesta API:", response);
        } catch (error) {
            setAlertMessage("❌ Error al eliminar el médico");
            setAlertType("error");
            setOpenAlert(true);
            console.error("❌ Error en la eliminación:", error);
        }
    };


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Container maxWidth="md" sx={{ mt: 2, mb: 4 }}>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                {/* ID de Médico */}
                                <Grid item xs={12}>
                                    <Typography variant='subtitle2'>ID de Médico</Typography>
                                    <TextField
                                        placeholder="Ingrese ID de médico"
                                        name="id"
                                        value={formValues.id}
                                        onChange={handleInputChange}
                                        fullWidth
                                        helperText="Ingrese el ID solo si desea consultar, actualizar o eliminar, en caso contrario dejar vacío."
                                    />
                                </Grid>
                                {/* Nombre y Apellidos */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='subtitle2'>Nómbre</Typography>
                                    <TextField
                                        placeholder="Ingrese su nómbre"
                                        name="firstName"
                                        value={formValues.firstName}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='subtitle2'>Apellidos</Typography>
                                    <TextField
                                        placeholder="Ingrese sus apellidos"
                                        name="lastName"
                                        value={formValues.lastName}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                {/* Correo y Teléfono */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='subtitle2'>Correo</Typography>
                                    <TextField
                                        placeholder="ejemplo@correo.com"
                                        name="email"
                                        type="email"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='subtitle2'>Teléfono</Typography>
                                    <TextField
                                        placeholder="Ingrese su teléfono"
                                        name="phone"
                                        value={formValues.phone}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                {/* Dirección */}
                                <Grid item xs={12}>
                                    <Typography variant='subtitle2'>Dirección</Typography>
                                    <TextField
                                        placeholder="Ingrese su dirección"
                                        name="address"
                                        value={formValues.address}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                {/* Ciudad, Código Postal y Colonia */}
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle2'>Ciudad</Typography>
                                    <TextField
                                        placeholder="Ciudad"
                                        name="city"
                                        value={formValues.city}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle2'>Código Postal</Typography>
                                    <TextField
                                        placeholder="Código Postal"
                                        name="postalCode"
                                        value={formValues.postalCode}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle2'>Colonia</Typography>
                                    <TextField
                                        placeholder="Colonia"
                                        name="neighborhood"
                                        value={formValues.neighborhood}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                {/* Nacionalidad */}
                                <Grid item xs={12}>
                                    <Typography variant='subtitle2'>Nacionalidad</Typography>
                                    <TextField
                                        placeholder="Nacionalidad"
                                        name="nationality"
                                        value={formValues.nationality}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                {/* Sección de Horario de Servicio */}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">Horario de Servicio</Typography>
                                </Grid>

                                {/* Lunes a Viernes */}
                                <Grid item xs={12} sm={3}>
                                    <Typography variant='subtitle2'>Lunes a Viernes</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Inicio"
                                        type="time"
                                        name="mondayFridayStart"
                                        value={schedule.mondayFriday.start}
                                        onChange={(e) =>
                                            handleScheduleChange('mondayFriday', 'start', e.target.value)
                                        }
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 300 }}
                                        disabled={!schedule.mondayFriday.works}
                                        required={schedule.mondayFriday.works}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Fin"
                                        type="time"
                                        name="mondayFridayEnd"
                                        value={schedule.mondayFriday.end}
                                        onChange={(e) =>
                                            handleScheduleChange('mondayFriday', 'end', e.target.value)
                                        }
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 300 }}
                                        disabled={!schedule.mondayFriday.works}
                                        required={schedule.mondayFriday.works}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={schedule.mondayFriday.works}
                                                onChange={(e) =>
                                                    handleScheduleChange('mondayFriday', 'works', e.target.checked)
                                                }
                                                color="primary"
                                            />
                                        }
                                        label="Trabaja"
                                    />
                                </Grid>

                                {/* Sábado */}
                                <Grid item xs={12} sm={3}>
                                    <Typography variant='subtitle2'>Sábado</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Inicio"
                                        type="time"
                                        name="saturdayStart"
                                        value={schedule.saturday.start}
                                        onChange={(e) =>
                                            handleScheduleChange('saturday', 'start', e.target.value)
                                        }
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 300 }}
                                        disabled={!schedule.saturday.works}
                                        required={schedule.saturday.works}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Fin"
                                        type="time"
                                        name="saturdayEnd"
                                        value={schedule.saturday.end}
                                        onChange={(e) =>
                                            handleScheduleChange('saturday', 'end', e.target.value)
                                        }
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 300 }}
                                        disabled={!schedule.saturday.works}
                                        required={schedule.saturday.works}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={schedule.saturday.works}
                                                onChange={(e) =>
                                                    handleScheduleChange('saturday', 'works', e.target.checked)
                                                }
                                                color="primary"
                                            />
                                        }
                                        label="Trabaja"
                                    />
                                </Grid>

                                {/* Domingo */}
                                <Grid item xs={12} sm={3}>
                                    <Typography variant='subtitle2'>Domingo</Typography>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Inicio"
                                        type="time"
                                        name="sundayStart"
                                        value={schedule.sunday.start}
                                        onChange={(e) =>
                                            handleScheduleChange('sunday', 'start', e.target.value)
                                        }
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 300 }}
                                        disabled={!schedule.sunday.works}
                                        required={schedule.sunday.works}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        label="Fin"
                                        type="time"
                                        name="sundayEnd"
                                        value={schedule.sunday.end}
                                        onChange={(e) =>
                                            handleScheduleChange('sunday', 'end', e.target.value)
                                        }
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ step: 300 }}
                                        disabled={!schedule.sunday.works}
                                        required={schedule.sunday.works}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={schedule.sunday.works}
                                                onChange={(e) =>
                                                    handleScheduleChange('sunday', 'works', e.target.checked)
                                                }
                                                color="primary"
                                            />
                                        }
                                        label="Trabaja"
                                    />
                                </Grid>

                                {/* Categoría y Rol */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Categoría
                                    </Typography>
                                    <FormControl fullWidth required>
                                        <Select
                                            name="category"
                                            value={formValues.category}
                                            onChange={handleInputChange}
                                            displayEmpty // Permite que la opción vacía sea visible
                                        >
                                            <MenuItem value="" disabled>
                                                <em>Seleccione la Categoría</em>
                                            </MenuItem>
                                            <MenuItem value="nutricion">Nutrición</MenuItem>
                                            <MenuItem value="medicina">Medicina</MenuItem>
                                            <MenuItem value="psicologia">Psicología</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Rol
                                    </Typography>
                                    <FormControl fullWidth required>
                                        <Select
                                            name="role"
                                            value={formValues.role}
                                            onChange={handleInputChange}
                                            displayEmpty // Permite que la opción vacía sea visible
                                        >
                                            <MenuItem value="" disabled>
                                                <em>Seleccione el Rol</em>
                                            </MenuItem>
                                            <MenuItem value="administrador">Administrador</MenuItem>
                                            <MenuItem value="medico">Médico</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>


                                {/* Password y Confirmar Password */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='subtitle2'>Password</Typography>
                                    <TextField
                                        placeholder="Ingrese su contraseña"
                                        name="password"
                                        type="password"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='subtitle2'>Confirmar Password</Typography>
                                    <TextField
                                        placeholder="Confirme su contraseña"
                                        name="confirmPassword"
                                        type="password"
                                        value={formValues.confirmPassword}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                {/* Botón de envío */}
                                <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2, mb: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            bgcolor: "#183a64",
                                            color: "#ffffff",
                                            flex: 1,
                                            '&:hover': { bgcolor: "#1259a5" }
                                        }}
                                    >
                                        Crear Médico
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleConsultDoctor}
                                        sx={{
                                            bgcolor: "#2e7d32",
                                            color: "#ffffff",
                                            flex: 1,
                                            '&:hover': { bgcolor: "#1b5e20" }
                                        }}
                                    >
                                        Consultar Médico
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleUpdateDoctor}
                                        sx={{
                                            bgcolor: "#f9a825",
                                            color: "#ffffff",
                                            flex: 1,
                                            '&:hover': { bgcolor: "#c17900" }
                                        }}
                                    >
                                        Actualizar Médico
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleDeleteDoctor}
                                        sx={{
                                            bgcolor: "#d32f2f",
                                            color: "#ffffff",
                                            flex: 1,
                                            '&:hover': { bgcolor: "#9a0007" }
                                        }}
                                    >
                                        Borrar Médico
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
            <SoftBox mb={3}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Doctores registrados</SoftTypography>
                    </SoftBox>

                    <SoftBox
                        sx={{
                            "& .MuiTableRow-root": {
                                cursor: "pointer",
                                "&:hover": { backgroundColor: "#f5f5f5" },
                            },
                        }}
                    >
                        <Table columns={columns} rows={rows} />
                    </SoftBox>
                </Card>
            </SoftBox>
            {/* Snackbar para mostrar mensajes de éxito o error */}
            <Snackbar
                open={openAlert}
                autoHideDuration={4000}
                onClose={() => setOpenAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenAlert(false)} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </DashboardLayout >
    );
}

export default DoctorRegistrationForm;
