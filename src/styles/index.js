import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from "../const"
const PRIMARYCOLOR = PRIMARY_COLOR;
const SECONDARYCOLOR = "white";

export default styles = StyleSheet.create({
    // Login
    loginMain: {
        backgroundColor: PRIMARYCOLOR,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    loginViewContent: {
        backgroundColor: "white",
        width: '90%',
        height: 300,
        borderRadius: 30,
        padding: 10
    },
    loginViewLogo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    // SIDEBAR
    sidebar: {
        backgroundColor: SECONDARYCOLOR
    },
    sidebarProfile: {
        color: SECONDARYCOLOR,
        fontSize: 20,
    },
    sidebarProfileView: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    sidebarProfileThumbnail: {
        width: 100,
        //width: null,
        height: 100,
        //borderRadius: 100 / 2,
        //borderRadius: 100/2,
        //borderColor: "white",
        //borderWidth: 2
    },
    listItemSelected: {
        // backgroundColor: PRIMARY_COLOR
        backgroundColor: "white",
    },
    listItemUnselected: {
        borderBottomWidth: 0
    },
    listTextSelected: {
        // color: "#fafafa",
        color: PRIMARY_COLOR,
        fontWeight: "bold"
    },
    listTextSelectedDark: {
        // color: "#fafafa",
        color: "black",
        fontWeight: "bold"
    },

    listTextUnselected: {
        // color: PRIMARY_COLOR
        // color: "#153A8B"
        color: "white",
        fontWeight: "100"
    },
    icon: {
        color: PRIMARY_COLOR
    },
    // HEADER
    header: {
        backgroundColor: PRIMARYCOLOR,
        borderBottomWidth: 0,
        shadowOpacity: 0
    },
    //MAIN
    main: {
        backgroundColor: SECONDARYCOLOR,
        flex: 1
    },
    mainContent: {
        padding: 10
    },
    // GENERAL
    textSecondary: {
        color: SECONDARYCOLOR,
        fontWeight: "100"
    },
    formItems: {
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: "white"
    },
    backgroundPrimary: {
        backgroundColor: PRIMARYCOLOR
    },
    colorPrimary: {
        backgroundColor: PRIMARYCOLOR
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
})
