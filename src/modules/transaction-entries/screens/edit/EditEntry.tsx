import React, { useContext, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, Input, Text, Icon,CheckBox } from '@rneui/base';
import DateTimePicker from '@react-native-community/datetimepicker'; //installation required
import { TransactionEntryContext } from '../../contexts/Contexts';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TransactionEntry } from '../../entities/transaction-entry.entity';
import moment from 'moment';

/**
 * Type for state variable for the form
 */
type IState = {
    id: number,
    txnDay: number | null;
    txnMonth: number | null;
    txnYear: number | null;
    date: Date;
    task: string;
    completed: boolean
}

const EditEntry: React.FC = () => {

    const { updateEntry } = useContext(TransactionEntryContext)!;

    //const route = useRoute();
    //below is the right declaration for TypeScript but looks complicated.
    const route = useRoute<RouteProp<Record<string, { transactionEntryToEdit: TransactionEntry }>>>();
    const transactionEntryToEdit = route.params.transactionEntryToEdit;

    const navigation = useNavigation();

    const date = new Date(); // for initializing all the dates.
    const [state, setState] = useState<IState>({
        id: transactionEntryToEdit.id,
        txnDay: transactionEntryToEdit.txnDay,
        txnMonth: transactionEntryToEdit.txnMonth,
        txnYear: transactionEntryToEdit.txnYear,
        date: new Date(transactionEntryToEdit.txnYear,transactionEntryToEdit.txnMonth,transactionEntryToEdit.txnDay),
        task: transactionEntryToEdit.task,
        completed: transactionEntryToEdit.completed?true:false
    })

    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios" ? true : false);

    return (
        <View style={styles.container}>
            <Text h3 style={styles.inputContainerStyle}>Edit displayed values</Text>
            {/* Only show button below if the OS is not ios. IOS DateTimePicker is visible by default */}
            <View style={[styles.inputContainerStyle, { flexDirection: 'row', alignSelf: 'flex-start' }]}>
                {Platform.OS !== "ios" && <Button
                    radius={6}
                    title={moment(state.date).format("LL")}
                    onPress={() => {
                        setShowDatePicker(true);
                    }}
                />}
                {showDatePicker && <DateTimePicker
                    style={styles.inputContainerStyle}
                    value={state.date}
                    mode={'date'}
                    //is24Hour={true}
                    display="default"
                    onChange={(_event: any, selectedDate: any) => {
                        const date: Date = selectedDate as Date;
                        setState({
                            ...state,
                            date: selectedDate,
                            txnDay: date.getDate(),
                            txnMonth: date.getMonth(),
                            txnYear: date.getFullYear()
                        })
                        setShowDatePicker(Platform.OS === "ios" ? true : false);
                    }}
                />}
            </View>
            <CheckBox
                title='Done?'
                containerStyle={[styles.inputContainerStyle, { marginTop: 10, borderColor: '#fffff2' }]}
                checked={!state.completed}
                onPress={() => { setState({ ...state, completed: !state.completed }) }}
            />
            <Input
                label="Task"
                placeholder="What are you going to do today?"
                multiline
                inputContainerStyle={styles.inputContainerStyle}
                leftIcon={<Icon
                    name="comment"
                    type="font-awesome"
                    color='hotpink'
                    size={25}
                  />}
                onChangeText={task => setState({ ...state, task })}
                style={styles.inputStyle}
            />

            <View style={{ flexDirection: 'row' }}>
                <Button style={[styles.inputContainerStyle, { paddingRight: 1 }]}
                    title="Save"
                    onPress={() => {
                        //call create which will also make the form disappear
                        //remove date before sending because it is not in the TransactionEntry table. Only the breakdown day, month, year are there
                        const {date, ...updatedTransactionEntryData} = state;
                        updateEntry(updatedTransactionEntryData, navigation);
                    }}
                /><Button style={[styles.inputContainerStyle, { paddingLeft: 1 }]}
                    title="Cancel"
                    onPress={() => {
                        //call create which will also make the form disappear
                        navigation.goBack();
                    }}
                    buttonStyle={{ backgroundColor: 'hotpink' }}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 18
    },
    inputContainerStyle: {
        width: '100%',
        padding: 10,
        backgroundColor: 'lavender',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    inputStyle: {
        backgroundColor: '#F2F3F5',
        borderRadius: 6,
        height: '100%',
        padding: 6
    }
});

export default EditEntry;