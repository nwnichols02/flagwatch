import ExpandableSection from '@/components/ExpandableSection';
import Header from '@/components/Header';
import TouchableLink from '@/components/TouchableLink';
import Colors from '@/theme/colors';
import { ExternalLink } from 'lucide-react-native';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InfoScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Flag Information" />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.intro}>
          The American flag is a symbol of our nation's history and values.
          Flying it at half-mast is a sign of respect, mourning, and honor.
        </Text>

        <ExpandableSection title="When Flags Fly at Half-Mast">
          <Text style={styles.sectionText}>
            The U.S. flag flies at half-mast during periods of national mourning,
            following the death of notable public officials or figures, and on days
            of remembrance such as Memorial Day (until noon), Peace Officers Memorial Day,
            Pearl Harbor Remembrance Day, and Patriot Day (9/11).
          </Text>
          <Text style={styles.sectionText}>
            The President or a state Governor can order flags to be flown at half-mast.
          </Text>
        </ExpandableSection>

        <ExpandableSection title="Official Authority">
          <Text style={styles.sectionText}>
            The President of the United States has the authority to order the flag to be
            flown at half-mast nationwide. State governors can order flags to be flown
            at half-mast within their state.
          </Text>
          <Text style={styles.sectionText}>
            For federal facilities, the U.S. Flag Code (4 U.S.C. § 7) establishes
            guidelines for when flags should be lowered.
          </Text>
        </ExpandableSection>

        <ExpandableSection title="Proper Flag Protocol">
          <Text style={styles.sectionText}>
            When lowering the flag to half-mast, first raise it to the peak of the
            staff, then lower it to the half-mast position.
          </Text>
          <Text style={styles.sectionText}>
            When raising a flag from half-mast, first raise it to the peak of the
            staff, then lower it all the way.
          </Text>
          <Text style={styles.sectionText}>
            On Memorial Day, the flag is flown at half-mast until noon, then raised
            to full-staff for the remainder of the day.
          </Text>
        </ExpandableSection>

        <View style={styles.linksContainer}>
          <Text style={styles.linksTitle}>Additional Resources:</Text>
          <TouchableLink
            text="U.S. Flag Code - Cornell Law School"
            url="https://www.law.cornell.edu/uscode/text/4/7"
            icon={<ExternalLink size={16} color={Colors.primary[700]} />}
          />
          <TouchableLink
            text="Veterans Affairs - Flag Respect"
            url="https://www.va.gov/opa/publications/celebrate/flagdisplay.pdf"
            icon={<ExternalLink size={16} color={Colors.primary[700]} />}
          />
          <TouchableLink
            text="Congressional Institute - Flag Guidelines"
            url="https://www.congressionalinstitute.org/2018/12/06/displaying-the-flag-at-half-staff/"
            icon={<ExternalLink size={16} color={Colors.primary[700]} />}
          />
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About HalfMast Now</Text>
          <Text style={styles.aboutText}>
            HalfMast Now was created to help citizens honor our nation's
            traditions and show proper respect during times of mourning
            and remembrance.
          </Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  intro: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.neutral[800],
    marginBottom: 24,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.neutral[800],
    marginBottom: 12,
  },
  linksContainer: {
    marginTop: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.neutral[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  linksTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[900],
    marginBottom: 12,
  },
  aboutContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[900],
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 15,
    textAlign: 'center',
    color: Colors.neutral[700],
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  version: {
    fontSize: 14,
    color: Colors.neutral[500],
  },
});