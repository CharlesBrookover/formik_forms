import React from 'react';
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from 'formik';
import * as yup from 'yup';

interface formValues {
    name: string,
    levelLow: number,
    levelHigh: number,
    races: Array<string>,
    professions: Array<string>,
    type: Array<string>,
    quality: Array<string>
}

const SearchForm = () => {

    const schema = yup.object().shape({
        name: yup.string().required(),
        levelLow: yup.number().positive().integer().min(0).max(80),
        levelHigh: yup.number().positive().integer().min(0).max(80).moreThan(yup.ref("levelLow")),
        races: yup.array().of(yup.string()).ensure(),
        professions: yup.array().of(yup.string()).ensure(),
        type: yup.array().of(yup.string()).ensure(),
        quality: yup.array().of(yup.string()).ensure()
    });

    return (
        <Formik
            initialValues={{name: '', levelLow: 0, levelHigh: 80, races: [], professions: [], type: [], quality: []}}
            validationSchema={schema}
            onSubmit={(values: formValues, actions: FormikHelpers<any>) => {
                setTimeout(() => {
                    console.log(JSON.stringify(values));
                    actions.setSubmitting(false);
                }, 1000);
            }}>
            <Form>
                <label htmlFor="name">Item Name</label>
                <Field name="name" placeholder="Enter item name"/>
                <ErrorMessage name="name" />

                <fieldset>
                    <legend>Levels</legend>
                    <Field name="levelLow" type="number" min="0" max="80"/>
                    <Field name="levelHigh" type="number" min="0" max="80"/>

                    <ErrorMessage name="levelLow" />
                    <ErrorMessage name="levelHigh" />
                </fieldset>

                <fieldset>
                    <legend>Races</legend>
                    <label>
                        <Field type="checkbox" name="races" value="asura"/>
                        Asura
                    </label>
                    <label>
                        <Field type="checkbox" name="races" value="human"/>
                        Human
                    </label>
                    <label>
                        <Field type="checkbox" name="races" value="charr"/>
                        Charr
                    </label>
                    <label>
                        <Field type="checkbox" name="races" value="norn"/>
                        Norn
                    </label>
                    <ErrorMessage name="races" />
                </fieldset>

                <fieldset>
                    <legend>Professions</legend>
                    <label>
                        <Field type="checkbox" name="professions" value="thief"/>
                        Thief
                    </label>
                    <label>
                        <Field type="checkbox" name="professions" value="warrior"/>
                        Warrior
                    </label>
                    <label>
                        <Field type="checkbox" name="professions" value="mesmer"/>
                        Mesmer
                    </label>
                    <label>
                        <Field type="checkbox" name="professions" value="ranger"/>
                        Ranger
                    </label>
                    <ErrorMessage name="professions" />
                </fieldset>

                <fieldset>
                    <legend>Item Type</legend>
                    <label>
                        <Field type="checkbox" name="type" value="weapon"/>
                        Weapon
                    </label>
                    <label>
                        <Field type="checkbox" name="type" value="armor"/>
                        Armor
                    </label>
                    <label>
                        <Field type="checkbox" name="type" value="trinket"/>
                        Trinket
                    </label>
                    <label>
                        <Field type="checkbox" name="type" value="gizmo"/>
                        Gizmo
                    </label>
                    <label>
                        <Field type="checkbox" name="type" value="consumable"/>
                        Consumable
                    </label>
                    <ErrorMessage name="type" />
                </fieldset>

                <fieldset>
                    <legend>Quality</legend>
                    <label>
                        <Field type="checkbox" name="quality" value="fine"/>
                        Fine
                    </label>
                    <label>
                        <Field type="checkbox" name="quality" value="master"/>
                        Master
                    </label>
                    <label>
                        <Field type="checkbox" name="quality" value="exotic"/>
                        Exotic
                    </label>
                    <label>
                        <Field type="checkbox" name="quality" value="ascended"/>
                        Ascended
                    </label>
                    <label>
                        <Field type="checkbox" name="quality" value="legendary"/>
                        Legendary
                    </label>
                    <ErrorMessage name="quality" />
                </fieldset>

                <button type="submit">Submit</button>
            </Form>

        </Formik>
    );
};

export default SearchForm;