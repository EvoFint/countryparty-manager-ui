import React from "react";
import {Form, Formik} from "formik";
import {Button, Grid, TextField} from "@material-ui/core";

const EditForm = ({
    initialState, onSubmit, onClose
}) => {
    return (<Grid item xs={12} style={{margin: 10}}>
        <Formik initialValues={initialState}
                onSubmit={v => onSubmit(v)}>
            {
                ({handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container direction="column" spacing={4}>
                            <Grid item xs={6}>
                                <TextField
                                    name="name"
                                    placeholder="Наименование"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="inn"
                                    placeholder="Инн"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="kpp"
                                    placeholder="Кпп"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="account"
                                    placeholder="Банковский счет"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="bic"
                                    placeholder="Бик"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button type="submit" color="primary">
                                    Подтвердить
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button type="button" onClick={() => {
                                    onClose()
                                }}>
                                    Отмена
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
        </Formik>
    </Grid>)
}

export default EditForm;
