import React, {useEffect, useMemo, useState} from "react";
import {
    AppBar,
    Button,
    Container, createMuiTheme,
    CssBaseline,
    Grid,
    MuiThemeProvider,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Formik, Form} from "formik";
import {COLUMNS, FORM_INITIAL_STATE} from './constants';
import {getAll, deleteItem, findByName, findByAccountAndBic} from './actions';
import {DataGrid} from '@material-ui/data-grid';
import EditForm from './components/EditForm'

const App = () => {
    const [counterparties, setCounterparties] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [counterpartyFormVisible, setCounterpartyFormVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formValue, setFormValue] = useState(FORM_INITIAL_STATE);
    const outerTheme = createMuiTheme({
        palette: {
            primary: {
                light: '#5db8ff',
                main: '#069EE3',
                dark: '#005b9d',
                contrastText: '#ededed',
            },
            secondary: {
                main: '#e51b1b',
                contrastText: '#000000',
            },
            background: {
                default: 'rgb(245, 245, 245)',
            },
            text: {
                secondary: 'rgba(0, 0, 0, 0.6)',
                secondaryWhite: 'rgba(255, 255, 255, 0.6)',
            },
        },
        typography: {
            // Use the system font.
            fontFamily:
                '"Golos", "PT Sans", "Helvetica Neue", "Open Sans","Segoe UI",Roboto,Arial,sans-serif',
        },
        overrides: {
            MuiTab: {
                wrapper: {
                    flexDirection: 'row',
                },
            },
        },
    });

    const performGetAll = () => {
        getAll().then(setCounterparties);
    }

    useEffect(() => {
        performGetAll();
    }, [])

    const onDelete = () => {
        deleteItem(selectedField.id).then(message => {
            console.log(message);
            performGetAll();
        });
    }

    const onSubmitFilter = () => {
        if (!!formValue.name) {
            findByName(formValue.name).then(setCounterparties);
        } else if (!!formValue.account && !!formValue.bic) {
            findByAccountAndBic(formValue.account, formValue.bic).then(setCounterparties);
        } else {
            performGetAll();
        }
    }

    const editFormInitialState = useMemo(() => (editMode ? selectedField : {
        ...FORM_INITIAL_STATE,
        inn: null,
        kpp: null
    }), [editMode, selectedField])

    const onSubmitEditForm = (v) => {
        console.log(v)
    }

    return (
        <MuiThemeProvider theme={outerTheme}>
            <Grid container wrap="nowrap">
                <Container>
                    <CssBaseline/>
                    <Grid item xs={12}>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6" noWrap>
                                    Менеджер контрагентов
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Grid item xs={12} style={{marginTop: 10, marginLeft: 10}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Formik
                                    initialValues={FORM_INITIAL_STATE}
                                    onSubmit={onSubmitFilter}>
                                    {({handleSubmit}) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Grid container spacing={4}>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        name="name"
                                                        placeholder="Наименование"
                                                        onChange={e => setFormValue({
                                                            ...formValue,
                                                            name: e.target.value
                                                        })}
                                                        disabled={!!formValue.account || !!formValue.bic}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        name="account"
                                                        placeholder="Номер счета"
                                                        onChange={e => setFormValue({
                                                            ...formValue,
                                                            account: e.target.value
                                                        })}
                                                        disabled={!!formValue.name}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        name="bic"
                                                        placeholder="БИК"
                                                        onChange={e => setFormValue({
                                                            ...formValue,
                                                            bic: e.target.value
                                                        })}
                                                        disabled={!!formValue.name}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Button variant="contained" color="primary" type="submit">
                                                        Применить
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    )}
                                </Formik>
                            </Grid>
                            <Grid item xs={12} style={{margin: 10}}>
                                <Grid container spacing={4}>
                                    <Grid item>
                                        <Button color="secondary" onClick={onDelete} disabled={!selectedField}>
                                            Удалить
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={() => {
                                            setEditMode(true);
                                            setCounterpartyFormVisible(true);
                                        }} disabled={!selectedField}>
                                            Редактировать
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button color="primary" onClick={() => setCounterpartyFormVisible(true)}>
                                            Добавить
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <DataGrid columns={COLUMNS} rows={counterparties} pageSize={20}
                                          onRowClick={v => {
                                              setSelectedField(counterparties.find(it => it.id === v.id))
                                          }}
                                          autoHeight/>
                            </Grid>
                            {counterpartyFormVisible && (
                                <EditForm initialState={editFormInitialState} onSubmit={onSubmitEditForm}
                                          onClose={() => setCounterpartyFormVisible(false)}/>)}
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </MuiThemeProvider>
    )
}

export default App;
