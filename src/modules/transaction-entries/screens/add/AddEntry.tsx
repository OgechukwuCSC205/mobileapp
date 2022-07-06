import React, { useContext, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, Input, Icon, Text, CheckBox } from '@rneui/base';
import DateTimePicker from '@react-native-community/datetimepicker'; //installation required
import { TransactionEntryContext } from '../../contexts/Contexts';
import { useNavigation } from '@react-navigation/native';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import moment from 'moment';

import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Type for state variable for the form
 */
type IState = {
    txnDay: number | null;
    txnMonth: number | null;
    txnYear: number | null;
    date: Date;
    task: string;
    completed: boolean
}

const AddEntry: React.FC = () => {

    const { createEntry } = useContext(TransactionEntryContext)!;

    const navigation = useNavigation();

    const date = new Date(); // for initializing all the dates.
    const [state, setState] = useState<IState>({
        txnDay: date.getDate(),
        txnMonth: date.getMonth(),
        txnYear: date.getFullYear(),
        date,
        task: '',
        completed: true
    })

    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios" ? true : false);

    return (
        <View style={styles.container}>
            <Text h3 style={styles.inputContainerStyle}>Add new Task</Text>
            {/* Only show button below if the OS is not ios. IOS DateTimePicker is visible by default */}
            <View style={[styles.inputContainerStyle, { flexDirection: 'row', alignSelf: 'flex-start' }]}>
                {Platform.OS !== "ios" &&  <Button
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
                <Button style={[styles.inputContainerStyle, { paddingRight: 10 }]}
                    title="Add Task"
                    onPress={() => {
                        //call create which will also make the form disappear
                        createEntry(state, navigation);
                    }}
                /><Button style={[styles.inputContainerStyle, { paddingLeft: 10 }]}
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

export default AddEntry;