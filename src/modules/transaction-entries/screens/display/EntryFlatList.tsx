import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Badge, Text } from '@rneui/base';

import EntryFlatListItem from './EntryFlatListItem';
import { ITransactionEntry } from '../../types/definitions';

type Props = {
    entries: ITransactionEntry[] | [] //array of entries
}

const EntryFlatList: React.FC<Props> = ({ entries }) => {

    return (
        <FlatList
            style={{ width: '100%', padding: 3, backgroundColor: 'white' }}
            data={entries}
            renderItem={({ item }) => (
                <EntryFlatListItem item={item} />
            )}
            ListHeaderComponent={
                () => (
                    <View>
                        <Text h3 style={[styles.inputContainerStyle, { backgroundColor: "pink" , textAlign: 'center'}]}>To Do list:  <Badge status="primary" value={entries.length} /></Text>
                    </View>
                )}

            /*
            ListFooterComponent = {
                ()=> (<View style={{backgroundColor:'#ccc', paddingBottom: 30, paddingTop: 3,alignContent:"flex-start"}}><Text style={{fontSize: 15, fontStyle: "italic"}}>Copyright: Pius Onobhayedo</Text></View>)
            }
            */

            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={
                //this component will be rendered in between items
                () => {
                    return (<View style={{ backgroundColor: 'white', height: 3, width: '100%' }} />)
                }
            }
        />
    )
}

EntryFlatList.defaultProps = {
    entries: []
}

export default EntryFlatList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'hotpink',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: { fontSize: 16, color: 'black', fontWeight: 'bold' },
    inputContainerStyle: {
        width: '100%',
        padding: 3
    }
});