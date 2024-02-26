/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

const SettingComponent = (props: any) => {
  return (
    <View style={styles.container}>
     <View>
      <CustomIcon
      name= {props.icon}
      style={styles.iconStyle}
      />
     </View>
     <View style={styles.settingContainer}>
      <Text style={styles.title}>{props.heading}</Text>
      <Text style={styles.subTitle}>{props.subheading}</Text>
      <Text style={styles.subTitle}>{props.subtitle}</Text>
     </View>
     <View style={styles.iconBG}>
      <CustomIcon
      name={'arrow-right'}
      style={styles.iconStyle}

      />
     </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.space_20,
  },
  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    paddingHorizontal: SPACING.space_20,
  },
  settingContainer: {
    flex: 1
  },
  title: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  subTitle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA15,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  iconBG: {
    justifyContent:'center',
  },
});

export default SettingComponent;