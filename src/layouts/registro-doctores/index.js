import React, { useState } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Button,
    Typography
} from '@mui/material';
import SoftTypography from 'components/SoftTypography';

function DoctorRegistrationForm() {

    const [formValues, setFormValues] = useState({
        id: '',
        nombre: '',
        apellidos: '',
        correo: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        colonia: '',
        nacionalidad: '',
        categoria: '',
        rol: '',
        password: '',
        confirmPassword: ''
    });

    // Estado para el horario de servicio (sin valores por defecto)
    const [schedule, setSchedule] = useState({
        mondayFriday: { works: false, start: '', end: '' },
        saturday: { works: false, start: '', end: '' },
        sunday: { works: false, start: '', end: '' }
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí se puede realizar la validación y el envío a la API
        console.log({ formValues, schedule });
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Card>
                    <CardHeader
                        title="Registro de Médico"
                        sx={{ backgroundColor: '#1976d2', color: 'white' }}
                    />
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {/* ID */}
                                <Grid item xs={12}>
                                    <Typography variant='subtitle2'>ID de Médico</Typography>
                                    <TextField
                                        name="id"
                                        value={formValues.id}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                {/* Nombre y Apellidos */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='subtitle2'>Nómbre</Typography>
                                    <TextField
                                        placeholder="Ingrese su nómbre"
                                        name="nombre"
                                        value={formValues.nombre}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='subtitle2'>Apellidos</Typography>
                                    <TextField
                                        placeholder="Ingrese sus apellidos"
                                        name="apellidos"
                                        value={formValues.apellidos}
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
                                        name="correo"
                                        type="email"
                                        value={formValues.correo}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant='subtitle2'>Teléfono</Typography>
                                    <TextField
                                        placeholder="Ingrese su teléfono"
                                        name="telefono"
                                        value={formValues.telefono}
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
                                        name="direccion"
                                        value={formValues.direccion}
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
                                        name="ciudad"
                                        value={formValues.ciudad}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle2'>Código Postal</Typography>
                                    <TextField
                                        placeholder="Código Postal"
                                        name="codigoPostal"
                                        value={formValues.codigoPostal}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='subtitle2'>Colonia</Typography>
                                    <TextField
                                        placeholder="Colonia"
                                        name="colonia"
                                        value={formValues.colonia}
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
                                        name="nacionalidad"
                                        value={formValues.nacionalidad}
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
                                            name="categoria"
                                            value={formValues.categoria}
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
                                            name="rol"
                                            value={formValues.rol}
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
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Registrar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </DashboardLayout >
    );
}

export default DoctorRegistrationForm;
