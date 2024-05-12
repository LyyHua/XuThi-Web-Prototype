import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Container, DropdownProps, Form } from "semantic-ui-react";
import { setSelectedCity as setCityInStore, setSelectedDistrict as setDistrictInStore, setSelectedWard as setWardInStore } from "../../app/store/Province";

type OptionType = {
    value: string;
    text: string;
}

export default function ProvinceDropDownOption() {
  const {control, formState: {errors}, setValue } = useForm({
    mode: 'onTouched'
  });

  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
  const [districtOptions, setDistrictOptions] = useState<OptionType[]>([]);
  const [wardOptions, setWardOptions] = useState<OptionType[]>([]);

  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<OptionType | null>(null);
  const [selectedWard, setSelectedWard] = useState<OptionType | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const cityResponse = await axios.get('https://vapi.vnappmob.com/api/province/');
        const cities = cityResponse.data.results.map((city: any) => ({ value: 'city-' + city.province_id, text: city.province_name }));
        setCityOptions(cities);

        if (selectedCity) {
          const districtResponse = await axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedCity.value.replace('city-', '')}`);
          const districts = districtResponse.data.results.map((district: any) => ({ value: 'district-' + district.district_id, text: district.district_name }));
          setDistrictOptions(districts);
        }

        if (selectedDistrict) {
          const wardResponse = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict.value.replace('district-', '')}`);
          const wards = wardResponse.data.results.map((ward: any) => ({ value: 'ward-' + ward.ward_id, text: ward.ward_name }));
          if (wards.length === 0 && selectedDistrict) {
            wards.push({ value: selectedDistrict.value, text: selectedDistrict.text });
          }
          setWardOptions(wards);
        }
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchOptions();
  }, [selectedCity, selectedDistrict, dispatch]);

  useEffect(() => {
    const storedCity = localStorage.getItem('city');
    const storedDistrict = localStorage.getItem('district');
    const storedWard = localStorage.getItem('ward');

    if (storedCity) {
      const cityOption = JSON.parse(storedCity);
      setSelectedCity(cityOption);
      dispatch(setCityInStore(cityOption));
    }

    if (storedDistrict) {
      const districtOption = JSON.parse(storedDistrict);
      setSelectedDistrict(districtOption);
      dispatch(setDistrictInStore(districtOption));
    }

    if (storedWard) {
      const wardOption = JSON.parse(storedWard);
      setSelectedWard(wardOption);
      dispatch(setWardInStore(wardOption));
    }
  }, [dispatch]);

  useEffect(() => {
    setValue('city', selectedCity);
    setValue('district', selectedDistrict);
    setValue('ward', selectedWard);
  }, [selectedCity, selectedDistrict, selectedWard, setValue, dispatch]);

  return (
    <Container className="province-container">
        <Controller
            name="city"
            control={control}
            rules={{ required: 'Bắt buộc phải chọn tỉnh/thành' }}
            defaultValue={selectedCity?.value || ''}
            render={({ field }) => (
                <Form.Select
                    className="province-dropdown"
                    label='Tỉnh/Thành'
                    placeholder="Chọn tỉnh/thành"
                    clearable
                    options={[{ value: '', text: 'Chọn tỉnh/thành' }, ...cityOptions]}
                    value={field.value?.value || ''}
                    onChange={(_, data: DropdownProps) => {
                      const selectedOption = cityOptions.find((option: OptionType) => option?.value === data.value as string) || null;
                      field.onChange(selectedOption);
                      setDistrictOptions([]);
                      setWardOptions([]);
                      setSelectedCity(selectedOption);
                      setSelectedDistrict(null); // Reset the district in local state
                      setSelectedWard(null); // Reset the ward in local state
                      dispatch(setCityInStore(selectedOption));
                      dispatch(setDistrictInStore(null)); // Reset the district in Redux store
                      dispatch(setWardInStore(null)); // Reset the ward in Redux store
                      setValue('district', null); // Clear the displayed value of the district dropdown
                      setValue('ward', null); // Clear the displayed value of the ward dropdown
                      localStorage.setItem('city', JSON.stringify(selectedOption));
                      localStorage.removeItem('district'); // Remove the district from local storage
                      localStorage.removeItem('ward'); // Remove the ward from local storage
                    }}
                    error={errors.city && errors.city.message}
                />
            )}
        />
        <Controller
            name="district"
            control={control}
            rules={{ required: 'Bắt buộc phải chọn quận/huyện' }}
            defaultValue={selectedDistrict?.value || ''}
            render={({ field }) => (
                <Form.Select
                    className="province-dropdown"
                    label='Quận/Huyện'
                    placeholder="Chọn quận/huyện"
                    clearable
                    options={[{ value: '', text: 'Chọn quận/huyện' }, ...districtOptions]}
                    value={field.value?.value}
                    onChange={(_, data: DropdownProps) => {
                      const selectedOption = districtOptions.find((option: OptionType) => option?.value === data.value as string) || null;
                      field.onChange(selectedOption);
                      setWardOptions([]);
                      setSelectedDistrict(selectedOption);
                      dispatch(setDistrictInStore(selectedOption));
                      localStorage.setItem('district', JSON.stringify(selectedOption));
                    }}
                    error={errors.district && errors.district.message}
                />
            )}
        />
        <Controller
            name="ward"
            control={control}
            rules={{ required: 'Bắt buộc phải chọn phường/xã' }}
            render={({ field }) => (
                <Form.Select
                    className="province-dropdown"
                    label='Phường/Xã'
                    placeholder="Chọn phường/xã"
                    clearable
                    options={[{ value: '', text: 'Chọn phường/xã' }, ...wardOptions]}
                    value={field.value?.value || ''}
                    onChange={(_, data: DropdownProps) => {
                      const selectedOption = wardOptions.find((option: OptionType) => option?.value === data.value as string) || null;
                      field.onChange(selectedOption);
                      setSelectedWard(selectedOption);
                      dispatch(setWardInStore(selectedOption));
                      localStorage.setItem('ward', JSON.stringify(selectedOption));
                  }}
                    error={errors.ward && errors.ward.message}
                />
            )}
        />
    </Container>
  )
}