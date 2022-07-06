import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup, Text, Button, Icon } from '@rneui/base';
import { showAlert, showDeleteConfirmation } from '../../../../global/tools/show-alert';
import { ITransactionEntry } from '../../types/definitions';
import { TransactionEntryContext } from '../../contexts/Contexts';
import { useNavigation } from '@react-navigation/native';


type Props = {
    item: ITransactionEntry;
}

const EntrySectionListItem: React.FC<Props> = ({ item }) => {

    const transactionEntryContext = useContext(TransactionEntryContext);
    
    const navigation = useNavigation();
    
    const { deleteEntry } = transactionEntryContext!
    
    return (
        <View style={styles.inputContainerStyle}>
            
            <Text style={{ fontSize: 18, color: 'brown' }}>Task: {item.task}</Text>
            <Text style={{ fontSize: 18, color: 'black' }}>Completed: {item.completed ? "No" : "Yes"}</Text>
            
            <ButtonGroup
                containerStyle={{ backgroundColor: 'pink', width: '60%', borderColor: 'red' , justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}
                buttons={
                    [<Button
                        icon={<Icon
                            name="edit"
                            color="black"
                        />}
                        type="clear"
                        title="Edit"
                        titleStyle={{ fontSize: 13 }}
                        onPress={() => navigation.navigate("EditEntryScreen" as never,{transactionEntryToEdit: item} as never)}
                    />,
                    <Button
                        icon={<Icon
                            name="delete"
                            color="black"
                        />}
                        type="clear"
                        title="Delete"
                        titleStyle={{ fontSize: 15 }}
                        onPress={() => {
                            //deleteEntry(item.id!)
                            showDeleteConfirmation(
                                "About to Delete",
                                "Are you sure that you want to delete this entry?",
                                item.id!,
                                deleteEntry
                            )
                        }}
                    />
                    ]
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainerStyle: {
        width: '100%',
        padding: 9
    }
});

export default EntrySectionListItem;