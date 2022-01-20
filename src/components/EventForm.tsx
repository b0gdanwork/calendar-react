import React, {useState} from 'react';
import {Button, Checkbox, DatePicker, Form, Input, Select} from "antd";
import {Option} from "antd/es/mentions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";
import moment, {Moment} from "moment";
import {formatData} from "../utils/data";
import {useActions} from "../hooks/useActions";
import {uid} from "../utils/unicId";


interface propsTypes  {
  selectedValue: Moment
}

type AllOptionCheckType = 'low'| 'normal' | 'high'

const EventForm:React.FC<propsTypes> = (props) => {

  const [event, setEvent] = useState({
    author: '',
    data: formatData(props.selectedValue.toDate()),
    description: '',
    quest: '',
    importance: 'normal'
  } as  IEvent)

  const CheckboxGroup = Checkbox.Group;
  const optionImportance:AllOptionCheckType[] = ['low', 'normal', 'high']
  const [checkedList, setCheckedList] = React.useState(['normal'] as AllOptionCheckType[]);

  const CheckboxGroupChange = (list: any):void => {
    let newList = list as AllOptionCheckType[]
    let missing = newList.filter(item => checkedList.indexOf(item) < 0);
    setCheckedList(missing)
    console.log(missing)
    setEvent({
      ...event,
      importance: missing.length ? missing[0] : null
    })
  }

  const quests = useTypedSelector(state => state.eventReducer.guests)
  const username = useTypedSelector(state => state.authReducer.user.username)
  const isLoading = useTypedSelector(state => state.eventReducer.isLoading)
  const [form] = Form.useForm();

  const {createEvent} = useActions()

  const selectData = (data:Moment | null)  => {
    if (data) {
      setEvent({
        ...event,
        data:formatData(data.toDate()),
      })
    }
  }

  const submit = () => {
    const newEvent = {
      ...event,
      id: uid(),
      author: username
    }
    createEvent(newEvent)
    form.resetFields()
  }

  return (
    <>
      <Form
        name="modal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={submit}
        form={form}
      >
        <Form.Item
          label="Дата события"
          name="data"
          rules={[{ min: 1, message: 'Обязательное поле' }]}
        >
          <DatePicker
            defaultValue={props.selectedValue}
            onChange={selectData}
          />
        </Form.Item>

        <Form.Item
          label="Название события"
          name="description"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Input
            placeholder="Название события"
            value={event.description}
            onChange={(e)=>{setEvent({...event, description: e.target.value})}}
          />
        </Form.Item>

        <Form.Item
          label="Выберите гостя:"
          name="quest"
        >
          <Select
            defaultValue="Выберите гостя"
            onChange={(quest:string) => setEvent({...event, quest})}
          >
            {quests.map((quest)=>{
              if (username == quest.username ) return
              return <Option key={quest.username} value={quest.username}>{quest.username}</Option>
            })}
          </Select>

        </Form.Item>

        <Form.Item
          label="Выберите срочность:"
          name="importance"
          valuePropName="checked"
          rules={[{ required: true, message: 'Выберите срочность' }]}
        >
          <CheckboxGroup
            options={optionImportance}
            value={checkedList}
            defaultValue={[]}
            onChange={CheckboxGroupChange}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Создать
          </Button>

        </Form.Item>

      </Form>
    </>
  );
};

export default EventForm;