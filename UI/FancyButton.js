import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";

function FancyButton({ children, onPress }) {
  return (
    <AwesomeButtonCartman
      width={200}
      height={50}
      onPress={onPress}
      backgroundColor="#009688"
      backgroundDarker="#43ada0"
      textColor="white"
      borderColor="white"
      textSize={16}
    >
      {children}
    </AwesomeButtonCartman>

    //   backgroundActive #when button clicked
    //       backgroundColor #Main color
    //       backgroundDarker #Bottom color
    //       height default 50
    //       width
    //       textColor
    //       textSize
    //       style
  );
}

export default FancyButton;
