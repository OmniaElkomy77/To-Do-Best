import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import themes from '../../utiltes/Themes';
import {IAddCardModal} from '../../utiltes/Type/Component';
import Card from '../General/Card';

const {height: windowHeight} = Dimensions.get('window');
const isIOS = (Platform.OS = 'ios');
const AddCardModal = (Props: IAddCardModal) => {
  const {visible, onClose, token, onAddCard} = Props;

  return (
    <Modal visible={visible} animationType={'slide'} transparent={false}>
      {/* <StatusBar backgroundColor={themes.white} barStyle={"dark-content"} /> */}

      <View style={styles.container_modal}>
        <ScrollView>
          <View style={styles.headercontainer}>
            <TouchableOpacity style={styles.icon} onPress={onClose}>
              <Icon name="arrowleft" size={30} color={themes.black} />
            </TouchableOpacity>
            <Text style={styles.headertext}>New card</Text>
          </View>

          <Card onAddCard={onAddCard} token={token} onClose={onClose} />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container_modal: {
    paddingTop: isIOS ? '10%' : 0,
    height: windowHeight, // Ensure full screen
    backgroundColor: themes.white, // Set background color to white
  },
  headercontainer: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themes.white,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 2,
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  headertext: {
    color: themes.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddCardModal;
