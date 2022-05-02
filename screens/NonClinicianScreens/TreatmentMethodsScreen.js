import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../UI/Header";

function TreatmentMethodsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header style={styles.header}>Lung Cancer Treatmens</Header>
      <View style={styles.content}>
        <Text>
          Treatment for lung cancer is managed by a team of specialists from
          different departments who work together to provide the best possible
          treatment. {"\n"}
          {"\n"}This team includes the health professionals required to make a
          diagnosis, to stage your cancer and to plan the best treatment. If you
          want to know more, ask your doctor or nurse about this.{"\n"}
          The type of treatment you receive for lung cancer depends on several
          factors, including:{"\n"}
          {"\n"}- the type of lung cancer you have (non-small-cell or small-cell
          mutations on the cancer) {"\n"}- the size and position of the cancer{" "}
          {"\n"}- how advanced your cancer is (the stage) {"\n"}- your overall
          health {"\n"}
          {"\n"}Deciding what treatment is best for you can be difficult. Your
          cancer team will make recommendations, but the final decision will be
          yours.{"\n"}
          {"\n"}The most common treatment options include surgery, radiotherapy,
          chemotherapy and immunotherapy. Depending on the type of cancer and
          the stage, you may receive a combination of these treatments.{"\n"}
        </Text>

        <Header>Your treatment plan</Header>
        <Text style={{ marginTop: 10 }}>
          Your suggested treatment plan depends on whether you have
          non-small-cell lung cancer or small-cell lung cancer.{"\n"}
        </Text>

        <Text style={styles.sideHeader}>Non-small-cell lung cancer</Text>
        <Text>
          If you have non-small-cell lung cancer that's in only 1 of your lungs
          and you're in good general health, you'll probably have surgery to
          remove the cancerous cells. This may be followed by a course of
          chemotherapy to destroy any cancer cells that may have remained in
          your body.{"\n"}
          {"\n"}If the cancer has not spread far but surgery is not possible
          (for example, because your general health means you have an increased
          risk of complications), you may be offered radiotherapy to destroy the
          cancerous cells. In some cases, this may be combined with chemotherapy
          (known as chemoradiotherapy).{"\n"}
          {"\n"}If the cancer has spread too far for surgery or radiotherapy to
          be effective, chemotherapy and / or immunotherapy is usually
          recommended. If the cancer starts to grow again after you have had
          chemotherapy treatment, another course of treatment may be
          recommended.{"\n"}
          {"\n"}
          In some cases, if the cancer has a specific mutation, biological or
          targeted therapy may be recommended instead of chemotherapy, or after
          chemotherapy. Biological therapies are medicines that control or stop
          the growth of cancer cells.{"\n"}
        </Text>

        <Text style={styles.sideHeader}>Small-cell lung cancer</Text>
        <Text>
          Small-cell lung cancer is usually treated with chemotherapy, either on
          its own or in combination with radiotherapy or immunotherapy. This can
          help to prolong life and relieve symptoms.{"\n"}
          {"\n"}Surgery isn't usually used to treat this type of lung cancer.
          This is because the cancer has often already spread to other areas of
          the body by the time it's diagnosed. However, if the cancer is found
          very early, surgery may be used. In these cases, chemotherapy or
          radiotherapy may be given after surgery to help reduce the risk of the
          cancer returning.{"\n"}
        </Text>

        <Header>Surgery</Header>
        <Text style={{ marginTop: 10 }}>
          There are 3 types of lung cancer surgery:
          {"\n"}
          {"\n"}
          -lobectomy – where one or more large parts of the lung (called lobes)
          are removed. Your doctors will suggest this operation if the cancer is
          just in 1 section of 1 lung.{"\n"}
          -pneumonectomy – where the entire lung is removed. This is used when
          the cancer is located in the middle of the lung or has spread
          throughout the lung.{"\n"}
          -wedge resection or segmentectomy – where a small piece of the lung is
          removed. This procedure is only suitable for a small number of
          patients. It is only used if your doctors think your cancer is small
          and limited to one area of the lung. This is usually very early-stage
          non-small-cell lung cancer.{"\n"}
          {"\n"}
          People may be concerned about being able to breathe if some or all of
          a lung is removed, but it's possible to breathe normally with 1 lung.
          However, if you have breathing problems before the operation, it's
          likely these symptoms will continue after surgery.
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

export default TreatmentMethodsScreen;

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
  sideHeader: {
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
  },
});
