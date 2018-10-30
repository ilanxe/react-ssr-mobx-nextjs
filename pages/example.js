import I18N from 'I18N'
import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react';
import fetch from "isomorphic-fetch"
import { Button } from 'antd'
import Head from 'next/head'

@inject('rootStore')
@observer
class Error extends React.Component {
    static async getInitialProps() {
        /**
         * server end get data
         */
        const res = await fetch('https://api.github.com/repos/zeit/next.js')
        const json = await res.json()
        return {
            storeData: {
                stars: json.stargazers_count
            }
        }
    }
    constructor(props) {
        super(props)
        const { rootStore } = props
        /**
         * init server end data to store.
         */
        rootStore.userStore.setStars(props.storeData.stars || 0)
    }
    render() {
        const { language, store, rootStore } = this.props
        const langText = I18N.langText(language)
        const changeLang = (language === 'zh_CN' ? 'en_US' : 'zh_CN')
        return (
            <div>
                <Head>
                    <title>Example</title>
                </Head>
                <p>Next.js has {this.props.storeData.stars} ⭐️</p>
                <p>Next.js has {rootStore.userStore.stars} ⭐️(read data from mobx store)</p>
                <p>{langText.example.pageError}</p>
                <Link href={`/${changeLang}/example`}>
                    <button>change language</button>
                </Link>
                <Link href={`/example/antd`}>
                    <Button htmlType="button" type="danger" onClick={() => this.changeUserInfo()}>看看Antd的用法</Button>
                </Link>
            </div>
        )
    }
}


export default Error