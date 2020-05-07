import React from 'react'
import { ScrollView, View, Text } from 'react-native'

function AfterLoginComponent({ data }) {
    console.warn(data.name)
    return (
        <View>
            <Text>Name: {data.name ? data.name : 'No data found'}</Text>
            <Text>Nasa JPL URL: {data.nasa_jpl_url ? data.nasa_jpl_url : 'No data found'}</Text>
            <Text>Is Potentially Hazardous Asteroid: {
                data.hasOwnProperty('is_potentially_hazardous_asteroid') ?
                    (data.is_potentially_hazardous_asteroid == false
                        ? 'False'
                        : 'True'
                    )
                    : 'No Data Found'
            }</Text>
        </View>
    )
}
export default AfterLoginComponent