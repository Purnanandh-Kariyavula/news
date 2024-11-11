import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { Colors } from '@/constants/Colors'

type Props = {
    setSearchQuery: Function
}

const SearchBar = ({setSearchQuery}: Props) => {
  return (
    <View style={styles.container}>
        <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.lightGrey} />
            <TextInput placeholder='Search' placeholderTextColor={Colors.lightGrey} style={styles.searchText} autoCapitalize='none' onChangeText={query =>setSearchQuery(query)}/>
        </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container:{
        marginBottom:20
    },
    searchBar:{
        backgroundColor:"#e4e4e4",
        paddingHorizontal:10,
        paddingVertical:12,
        borderRadius:10,
        flexDirection:"row",
        gap:10
    },
    searchText:{
        fontSize:14,
        flex:1,
        color:Colors.darkGrey
    }
})