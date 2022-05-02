import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../UI/Header";

function GeneralInfoScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header style={styles.header}>Lung Cancer</Header>
      <View style={styles.content}>
        <Text>
          Lung cancer is one of the most common and serious types of cancer.
          Around 47,000 people are diagnosed with the condition every year in
          the UK. {"\n"}
          {"\n"}There are usually no signs or symptoms in the early stages of
          lung cancer, but many people with the condition eventually develop
          symptoms including:{"\n"}
          {"\n"}- a persistent cough {"\n"}- coughing up blood {"\n"}-
          persistent breathlessness {"\n"}- unexplained tiredness and weight
          loss {"\n"}- an ache or pain when breathing or coughing{"\n"}
          {"\n"}You should see a GP if you have these symptoms.{"\n"}
        </Text>

        <Header>Types of lung cancer</Header>
        <Text style={{ marginTop: 10 }}>
          Cancer that begins in the lungs is called primary lung cancer. Cancer
          that spreads to the lungs from another place in the body is known as
          secondary lung cancer. This page is about primary lung cancer.{"\n"}
          {"\n"}
          There are two main forms of primary lung cancer. These are classified
          by the type of cells in which the cancer starts growing. They are:
          {"\n"}
          {"\n"}- non-small-cell lung cancer – the most common form, accounting
          for more than 87% of cases. It can be one of three types: squamous
          cell carcinoma, adenocarcinoma or large-cell carcinoma.
          {"\n"}- small-cell lung cancer – a less common form that usually
          spreads faster than non-small-cell lung cancer.{"\n"}
          {"\n"}
          The type of lung cancer you have determines which treatments are
          recommended.
        </Text>

        <Header>Who's affected</Header>
        <Text style={{ marginTop: 10 }}>
          Lung cancer mainly affects older people. It's rare in people younger
          than 40. More than 4 out of 10 people diagnosed with lung cancer in
          the UK are aged 75 and older.{"\n"}
          {"\n"}
          Although people who have never smoked can develop lung cancer, smoking
          is the most common cause (accounting for about 72% of cases). This is
          because smoking involves regularly inhaling a number of different
          toxic substances.{"\n"}
        </Text>

        <Header>Treating lung cancer</Header>
        <Text style={{ marginTop: 10 }}>
          Treatment depends on the type of mutation the cancer has, how far it's
          spread and how good your general health is.{"\n"}
          {"\n"}
          If the condition is diagnosed early and the cancerous cells are
          confined to a small area, surgery to remove the affected area of lung
          may be recommended.{"\n"}
          {"\n"}
          If surgery is unsuitable due to your general health, radiotherapy to
          destroy the cancerous cells may be recommended instead.{"\n"}
          {"\n"}
          If the cancer has spread too far for surgery or radiotherapy to be
          effective, chemotherapy is usually used.{"\n"}
          {"\n"}
          There are also a number of medicines known as targeted therapies. They
          target a specific change in or around the cancer cells that is helping
          them to grow. Targeted therapies cannot cure lung cancer but they can
          slow its spread.{"\n"}
        </Text>
      </View>
    </ScrollView>
  );
}

export default GeneralInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    backgroundColor: "#dee5e6",
    padding: 15,
  },
  header: {
    marginTop: 5,
    alignSelf: "center",
  },
  content: {
    marginTop: 15,
  },
});
