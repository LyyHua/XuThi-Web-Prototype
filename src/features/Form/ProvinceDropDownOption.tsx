import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Container, DropdownProps, Form } from "semantic-ui-react";

type OptionType = {
    value: string;
    text: string;
}

export default function ProvinceDropDownOption() {
  const {control, formState: {errors} } = useForm({
    mode: 'onTouched'
  });

  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
  const [districtOptions, setDistrictOptions] = useState<OptionType[]>([]);
  const [wardOptions, setWardOptions] = useState<OptionType[]>([]);

  axios.get('https://vapi.vnappmob.com/api/province/')
  .then(response => {
    setCityOptions(response.data.results.map((city: any) => ({ value: 'city-' + city.province_id, text: city.province_name })));
  })
  .catch(error => {
    console.error('There was an error!', error);
  });

  return (
    <Container style={{display: 'flex', justifyContent: 'space-between'}}>
        <Controller
            name="city"
            control={control}
            rules={{ required: 'Bắt buộc phải chọn tỉnh/thành' }}
            render={({ field }) => (
                <Form.Select
                    className="province-dropdown"
                    label='Tỉnh/Thành'
                    placeholder="Chọn tỉnh/thành"
                    clearable
                    options={cityOptions}
                    value={field.value?.value || ''}
                    onChange={(_, data: DropdownProps) => {
                        const selectedOption = cityOptions.find((option: OptionType) => option?.value === data.value as string);
                        field.onChange(selectedOption);
                        setDistrictOptions([]);
                        setWardOptions([]);
                        if (selectedOption?.value) {
                            axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedOption.value.replace('city-', '')}`)
                            .then(response => {
                              setDistrictOptions(response.data.results.map((district: any) => ({ value: 'district-' + district.district_id, text: district.district_name })));
                            });
                        }
                    }}
                    error={errors.city && errors.city.message}
                />
            )}
        />
        <Controller
            name="district"
            control={control}
            rules={{ required: 'Bắt buộc phải chọn quận/huyện' }}
            render={({ field }) => (
                <Form.Select
                    className="province-dropdown"
                    label='Quận/Huyện'
                    placeholder="Chọn quận/huyện"
                    clearable
                    options={districtOptions}
                    value={field.value?.value}
                    onChange={(_, data: DropdownProps) => {
                        const selectedOption = districtOptions.find((option: OptionType) => option?.value === data.value as string);
                        field.onChange(selectedOption);
                        setWardOptions([]);
                        if (selectedOption?.value) {
                          axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedOption.value.replace('district-', '')}`)
                          .then(response => {
                            let wards = response.data.results.map((ward: any) => ({ value: 'ward-' + ward.ward_id, text: ward.ward_name }));
                            if (wards.length === 0 && selectedOption) {
                              wards.push({ value: selectedOption.value, text: selectedOption.text });
                            }
                            setWardOptions(wards);
                          });
                        }
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
                    options={wardOptions}
                    value={field.value?.value || ''}
                    onChange={(_, data: DropdownProps) => {
                        const selectedOption = wardOptions.find((option: OptionType) => option?.value === data.value as string);
                        field.onChange(selectedOption);
                    }}
                    error={errors.ward && errors.ward.message}
                />
            )}
        />
    </Container>
  )
}