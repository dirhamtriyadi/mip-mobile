import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import instance from "../../configs/axios";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";

interface PenagihanData {
  id: string;
  no_billing: string;
  date: string;
  customer: {
    id: string;
    name_customer: string;
    no: string;
  };
  latestBillingStatus?: {
    status?: {
      label: string;
      value: string;
    };
    status_date?: string;
  };
}

function PenagihanScreen() {
  const [data, setData] = useState<PenagihanData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchBillings();
  }, [search]); // Pencarian akan otomatis dilakukan saat `search` berubah

  const fetchBillings = async () => {
    try {
      setLoading(true);
      const response = await instance.get("v1/billings", {
        params: search ? { search } : {},
      });
      setData(response.data.data);
    } catch (error: any) {
      Alert.alert("Gagal mengambil data penagihan", error.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchBillings(); // Memanggil kembali API saat tombol pencarian ditekan
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>List Tagihan</Text>
        <View style={styles.groupSearch}>
          <TextInput
            placeholder="Masukan kata pencarian"
            style={{ width: "90%" }}
            value={search}
            onChangeText={setSearch}
            keyboardType="default"
            onSubmitEditing={handleSearch} // Jalankan pencarian saat "Enter" ditekan
          />
          <TouchableOpacity style={{ justifyContent: "center" }} onPress={handleSearch}>
            <Icon name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.listContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            data.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.btn, { padding: 10, backgroundColor: "#f8f8f8", borderRadius: 10 }]}
                onPress={() => navigation.navigate("DetailPenagihan", { id: item.id })}
              >
                <View style={styles.head}>
                  <Text style={styles.textKontrak}>No. Kontrak: {item.customer.no}</Text>
                  <Text style={styles.textDate}>{item.date}</Text>
                </View>
                <Text>No. Tagihan: {item.no_billing}</Text>
                <Text>{item.customer.name_customer}</Text>
                <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
                  {item.latestBillingStatus?.status?.value ? (
                    <Text style={getStatusStyle(item.latestBillingStatus.status.value)}>
                      {item.latestBillingStatus.status.label}
                    </Text>
                  ) : (
                    <Text style={styles.statusError}>Belum Ada</Text>
                  )}
                  {item.latestBillingStatus?.status_date && <Text>{item.latestBillingStatus.status_date}</Text>}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "visit":
      return styles.statusVisit;
    case "promise_to_pay":
      return styles.statusPromiseToPay;
    case "pay":
      return styles.statusPay;
    default:
      return styles.statusError;
  }
};

export default PenagihanScreen;
