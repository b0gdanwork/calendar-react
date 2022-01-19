import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Select} from "antd";
import {Option} from "antd/es/mentions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatData} from "../utils/data";
import {useActions} from "../hooks/useActions";


const EventForm: FC = () => {

  const [event, setEvent] = useState({
    author: '',
    data: '',
    description: '',
    quest: ''
  } as  IEvent)

  const quests = useTypedSelector(state => state.eventReducer.guests)
  const username = useTypedSelector(state => state.authReducer.user.username)

  const {createEvent} = useActions()

  const selectData = (data:Moment | null)  => {
    if (data) {
      setEvent({...event, data:formatData(data.toDate())})
    }
  }

  const submit = () => {
    createEvent({...event, author: username})
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
      >
        <Form.Item
          label="Дата события"
          name="data"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <DatePicker
            onChange={selectData}
          />
        </Form.Item>

        <Form.Item
          label="Название события"
          name="description"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Input
            value={event.description}
            onChange={(e)=>{setEvent({...event, description: e.target.value})}}
          />
        </Form.Item>

        <Form.Item
          label="Выберите гостя:"
          name="quest"
          rules={[{ required: true, message: 'Обязательное поле' }]}
        >
          <Select
            defaultValue="Выберите гостя"
            onChange={(quest:string) => setEvent({...event, quest})}
          >
            {quests.map((quest)=>{
              return <Option key={quest.username} value={quest.username}>{quest.username}</Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
          >
            Создать
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EventForm;