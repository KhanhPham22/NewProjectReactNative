import React, {useEffect,useRef, useState} from "react";
import { Dimensions, Animated, StyleSheet, Easing, TextInput } from "react-native";

const width = (Dimensions.get("screen").width *2) /3 +50;

interface IUserForm {
    label : string;
    duration?:number;
    labelColor?: string;
    text?: string;
    updateText?: (text: string) => void;
}