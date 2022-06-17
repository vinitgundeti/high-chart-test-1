/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import HighchartsReactNative from '@highcharts/highcharts-react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const maturityCalculation = (
    rate = 0,
    tenure = 0,
    sipAmount = 0,
    lumpsum = 0,
  ) => {
    tenure *= 12;
    rate /= 100;
    const mRor = (1 + rate) ** (1 / 12) - 1;
    let targetAmount =
      (sipAmount * ((1 + mRor) ** tenure - 1) * (1 + mRor)) / mRor;
    if (lumpsum) {
      targetAmount += calculaterMaturityLumpsum(
        lumpsum,
        tenure / 12,
        rate * 100,
      );
    }
    return Math.round(targetAmount);
  };

  const calculaterMaturityLumpsum = (lumpsumAmount, tenure, annualReturn) =>
    lumpsumAmount * (1 + annualReturn / 100) ** tenure;

  const handleSipMaturityValue = (rate, tenure) => {
    let finalValue;
    if (1000) {
      finalValue = maturityCalculation(rate, tenure, 1000, 5000);
    } else {
      finalValue = calculaterMaturityLumpsum(5000, tenure, rate);
    }
    // return Math.round(finalValue);
    return Math.round(finalValue / 100) * 100;
  };
  let savingsReturnsInPercentage = 20;
  let fdReturnsInPercentage = 30;
  let expectedReturnsInPercentage = 40;
  let tenureInYears = 10;
  const xAxisData = [
    `Savings Account <br/> ${
      handleSipMaturityValue(savingsReturnsInPercentage, tenureInYears) || 0
    }`,
    `Fixed Deposit <br/> ${
      handleSipMaturityValue(fdReturnsInPercentage, tenureInYears) || 0
    }`,
    `This Fund* <br/> ${
      handleSipMaturityValue(expectedReturnsInPercentage, tenureInYears) || 0
    }`,
  ];

  const chartOptions = {
    chart: {
      type: 'column',
      style: {
        fontFamily: "font-family: 'Work Sans', sans-serif;",
      },
    },
    label: {
      style: {
        fontFamily: 'Mark-Bold',
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: '',
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      categories: xAxisData,
      crosshair: false,
      gridLineColor: '#fff',
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      minorTickLength: 0,
      tickLength: 0,
      labels: {
        style: {
          color: '#ccc',
          fontSize: 12,
          fontFamily: 'Work Sans',
        },
      },
    },
    yAxis: {
      visible: false,
      title: {
        text: '',
      },
      gridLineColor: '#fff',
    },
    tooltip: {
      headerFormat: null,
      pointFormat:
        '<div style="display:flex;align-items:center;font-family:Work Sans"><div style="background-color:{series.color};border-radius:50%;width:8;height:8;margin-right:3"></div><b style="margin-left:3">₹ {point.y}</b><br/></div>',
      shared: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 5,
      },
    },
    series: [
      {
        name: ' ',
        data: [
          {
            y: handleSipMaturityValue(
              savingsReturnsInPercentage,
              tenureInYears,
            ),
            color: 'blue',
          },
          {
            y: handleSipMaturityValue(fdReturnsInPercentage, tenureInYears),
            color: 'blue',
          },
          {
            y: handleSipMaturityValue(
              expectedReturnsInPercentage,
              tenureInYears,
            ),
            color: 'skyblue',
          },
        ],
      },
    ],
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
          <HighchartsReactNative
            styles={{
              marginTop: 30,
              backgroundColor: '#fff',
              justifyContent: 'center',
              paddingLeft: 0,
              height: 250,
            }}
            options={chartOptions}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
