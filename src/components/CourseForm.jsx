import { useState, useForm } from 'react';
import styles from '../styles/Form.module.css'
import { Form, Input, Button, Select, message } from 'antd';

const CourseForm = () => {
    const [form] = Form.useForm()
    const [isFree, setFree] = useState(true)
    const [messageApi, contextHolder] = message.useMessage();


    const courseDetail = (value) => {
        console.log(value)
        fetch('/api/course/create', {
            method: 'POST',
            headers: { Accept: "application/json", "content-type": "application/json" },
            body: JSON.stringify(value)
        }).then(res => {
            res.json().then(data => {
                console.log(data)
                messageApi.info(data.message);
            })
        })

        form.resetFields()
    }

    return (
        <section>
            {contextHolder}
            <Form
                form={form}
                initialValues={{
                    courseType: 'FREE'
                }}
                name="courseDetail"
                labelCol={{
                    span: 8,
                }}

                wrapperCol={{
                    span: 24,
                }}
                onFinish={courseDetail}
            >
                <Form.Item name={['name']} label={'Name'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['age']} label={'Age'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your age!',
                        },
                    ]}>
                    <Input type='number' />
                </Form.Item>
                <Form.Item name={['mobile']} label={'Mobile'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your mobile number!',
                        },
                    ]}>
                    <Input type='number' />
                </Form.Item>
                <Form.Item name={['email']} label={'E-mail'}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your emial!',
                        },
                    ]}>
                    <Input type='email' />
                </Form.Item>
                <Form.Item name={['courseType']} label={'CourseType'}
                    rules={[
                        {
                            required: true,
                            message: 'Please select a course!',
                        },
                    ]}>
                    <Select

                        style={{
                            width: 120,
                        }}
                        allowClear
                        options={[
                            {
                                value: 'FREE',
                                label: 'FREE',
                            },
                            {
                                value: 'PAID',
                                label: 'PAID',
                            },
                        ]}
                    />
                </Form.Item>
                {!isFree && <Form.Item name={'coursePrice'} label={'Price'}
                    rules={[
                        {
                            required: true,
                            message: 'Please select the price!',
                        },
                    ]}>
                    <Select
                        style={{
                            width: 120,
                        }}
                        allowClear
                        options={[
                            {
                                value: '30000',
                                label: '30000',
                            },
                            {
                                value: '40000',
                                label: '40000',
                            },
                            {
                                value: '60000',
                                label: '60000',
                            }
                        ]}
                    />
                </Form.Item>}
                <Button type='primary' htmlType='submit' >Submit Form</Button>
            </Form>

        </section>
    )
}
export default CourseForm