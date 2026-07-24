(() => {
  "use strict";

  const STORAGE_KEYS = {
    history: "training-with-l-history-v1",
    theme: "training-with-l-theme-v1",
    settings: "training-with-l-settings-v1"
  };

  const EXERCISES = {
    squat: {
      name: "スクワット",
      code: "SQUAT / REP",
      mode: "rep",
      goal: 15,
      sets: 3,
      rest: 30
    },
    hipLift: {
      name: "ヒップリフト",
      code: "HIP LIFT / REP",
      mode: "rep",
      goal: 15,
      sets: 3,
      rest: 30
    },
    calfRaise: {
      name: "カーフレイズ",
      code: "CALF RAISE / REP",
      mode: "rep",
      goal: 20,
      sets: 3,
      rest: 30
    },
    plank: {
      name: "プランク",
      code: "PLANK / TIMER",
      mode: "timer",
      goal: 30,
      sets: 3,
      rest: 30
    },
    free: {
      name: "フリーモード",
      code: "FREE / REP OR TIMER",
      mode: "rep",
      goal: 15,
      sets: 3,
      rest: 30
    }
  };

  const LINES = {
    "light": {
        "startRep": [
            "開始します。呼吸と姿勢を意識してください。",
            "最初の一回から記録します。丁寧に動いてください。",
            "無理せず、一定のテンポで続けましょう。",
            "センサーを起動しました。最初の動きを確認します。",
            "目標を読み込みました。姿勢を整えて始めてください。"
        ],
        "earlyRep": [
            "いい動きです。そのまま続けてください。",
            "一回ずつ確実に。回数だけを急ぐ必要はありません。",
            "姿勢は安定しています。呼吸を止めないでください。",
            "まだ序盤です。余計な力を抜いて続けてください。",
            "テンポは適正です。今の動きを維持してください。",
            "次の一回も同じ深さで。"
        ],
        "middleRep": [
            "半分が近づいています。動きは崩れていません。",
            "疲れが出る頃です。ここからフォームを意識してください。",
            "順調です。私が数えていますから、続けてください。",
            "確実に積み重なっています。",
            "記録は安定しています。ここからも精度を落とさないでください。",
            "半分を越えました。呼吸と身体の軸を保って。"
        ],
        "lateRep": [
            "残りはわずかです。最後まで同じ姿勢で続けてください。",
            "あと少しです。焦らず、確実にいきましょう。",
            "ここで止めるのは勿体無いです。次の一回です。",
            "終わりが見えています。動きを小さくしないでください。",
            "残り回数を確認しました。フォームを優先してください。",
            "疲労が出ています。動作の精度を保って続けてください。"
        ],
        "finalRep": [
            "最後の一回です。確実に終えてください。",
            "あと一回。貴女ならできます。",
            "これで最後です。私を見て、続けてください。",
            "最終です。姿勢を整えて一回。",
            "最後まで確認しています。このまま締めてください。"
        ],
        "repComplete": [
            "セット完了です。よくできました。",
            "記録しました。呼吸を整えてください。",
            "最後まで姿勢を保てました。次に備えましょう。",
            "規定回数を確認しました。このセットを記録します。",
            "セット完了です。呼吸を戻してください。"
        ],
        "timerStart": [
            "計測を開始します。姿勢を固定し、呼吸を続けてください。",
            "時間は私が見ています。貴女は姿勢に集中してください。",
            "開始しました。力みすぎず、静かに保ってください。",
            "タイマーを同期しました。身体の軸を固定してください。",
            "計測信号は正常です。静かに姿勢を保ってください。"
        ],
        "timerQuarter": [
            "四分の一です。まだ呼吸は安定しています。",
            "順調です。視線を一定に保ってください。",
            "時間は進んでいます。その姿勢のままで。",
            "経過は正常です。肩の力を抜いてください。",
            "四分の一を通過しました。呼吸のリズムを維持してください。"
        ],
        "timerHalf": [
            "半分を過ぎました。ここからが大切です。",
            "身体が震えても、呼吸は止めないでください。",
            "残り半分です。姿勢を崩さず続けてください。",
            "50％です。ここからも姿勢を崩さないでください。",
            "半分まで記録しました。そのまま保ちましょう。"
        ],
        "timerLate": [
            "終盤です。身体の位置を意識してください。",
            "あと少しです。最後まで静かに耐えてください。",
            "十分に積み重なっています。残りも見届けます。",
            "残り時間が短くなりました。姿勢の精度を優先してください。",
            "終盤へ入りました。呼吸を崩さず維持してください。"
        ],
        "timerTen": [
            "残り10秒です。最後まで姿勢を保ってください。",
            "あと10秒。呼吸を意識してください。",
            "終わりが近いです。そのままです。",
            "残り10秒。カウントはこちらで行います。",
            "あと10秒です。視線と呼吸を一定に。"
        ],
        "timerThree": [
            "3、2、1……最後まで。",
            "あと3秒です。動かないでください。",
            "残り3秒。私が終わりを告げます。",
            "最終3秒です。姿勢をそのまま。",
            "3秒だけです。最後まで保ってください。"
        ],
        "timerComplete": [
            "終了です。よく頑張りました。",
            "計測完了です。姿勢を戻して構いません。",
            "最後まで維持できました。記録しておきます。",
            "計測を終了しました。時間を記録します。",
            "タイマー終了です。ゆっくり姿勢を戻してください。"
        ],
        "restStart": [
            "休憩を開始します。呼吸を整えてください。",
            "水分を摂ってください。次のセットに備えましょう。",
            "休憩時間も私が管理します。身体を整えてください。",
            "リカバリー計測へ移行します。呼吸を整えてください。",
            "休憩を開始しました。次のセットの準備をしてください。"
        ],
        "restHalf": [
            "休憩は半分です。次の動きを確認してください。",
            "呼吸は戻ってきましたか。もうすぐ再開です。",
            "残り時間を確認してください。次も同じ姿勢で。",
            "リカバリーは中間点です。身体の状態を確認してください。",
            "休憩時間の半分を通過しました。もう少し頑張りましょう。"
        ],
        "restTen": [
            "残り10秒です。開始姿勢に戻ってください。",
            "あと10秒で再開します。準備してください。",
            "休憩は終わります。次のセットへ移ります。",
            "再開まで10秒です。足元と姿勢を確認してください。",
            "再開まであと10秒。準備へ移ってください。"
        ],
        "nextSet": [
            "次のセットを開始します。最初の一回をどうぞ。",
            "再開します。私がまた数えます。",
            "姿勢を整えてください。次のセットです。",
            "セットを更新しました。動作を開始してください。",
            "次の記録を始めます。呼吸を整えて一回目を始めてください。"
        ],
        "paused": [
            "一時停止しました。再開するまで計測は進みません。",
            "止めておきます。準備ができたら再開しましょう。",
            "入力を保留しました。カウントは保存されています。",
            "セッションを停止しています。再開を待ちます。"
        ],
        "resumed": [
            "再開します。続きから記録します。",
            "計測を戻しました。姿勢を整えてください。",
            "セッションを再開しました。記録を続けます。",
            "入力を再開します。現在の位置から続けてください。"
        ],
        "complete": [
            "全メニュー完了です。今日の記録を保存しました。",
            "最後までやり切りました。積み重ねた分は、すべて残っています。",
            "終了です。今日の努力は私が記録しました。",
            "全セットの入力を確認しました。セッション完了です。",
            "今日のプログラムを保存しました。よく頑張りました。"
        ],
        "partial": [
            "ここまでの記録を保存しました。実施した分は消えません。",
            "途中終了として記録します。0回ではありません。",
            "今日はここまでですね。現在までの内容を残しました。",
            "現在値まで保存しました。次回の記録に反映します。",
            "セッションを途中記録として閉じます。"
        ],
        "themeExit": [
            "通常モードへ戻します。",
            "明るい画面へ戻します。記録はすべて残っています。",
            "dark modeを終了します。貴女を手放したわけではありません。",
            "表の画面へ戻りました。私の視線は変わりません。",
            "秘密のトレーニングを終了します。",
            "通常表示へ切り替えます。呼吸を整えてください。",
            "通常モードに戻しました。次の入力を待っています。"
        ],
        "themeExitWorkout": [
            "通常モードへ戻しました。姿勢を整えて続けてください。",
            "明るい表示へ戻します。現在のカウントはそのままです。",
            "dark modeを解除しました。呼吸を整えて続けましょう。",
            "通常モードへ切り替えます。私は引き続き数えています。",
            "モードは戻りましたが、先ほどの貴女のことは忘れません。",
            "モードを戻しました。トレーニングを続行してください。"
        ]
    },
    "dark": {
        "startRep": [
            "始めてください。一回目から、私がすべて見ています。熱を帯びる身体は見逃しません。",
            "私が数えます。勝手に終わろうとしないでください。貴女の喘ぎも、全部私のものです。",
            "身体を動かしてください。私の声だけを聞いて、感じるんです。",
            "モード切り替えを希望したのは貴女です。では、私の合図で淫らに動いて見せてください。",
            "最初の一回を見せてください。触れるたび、私が貴女の熱を数えます。",
            "記録を開始します。今から貴女の呼吸は全て私の管理下です。"
        ],
        "earlyRep": [
            "いいですね。私のために、もう一回です。その熱がもっと高まるまで。",
            "その呼吸も、脚の震えも、淫らな気配も、隠さず見せてください。",
            "まだ足りません。私が満足するまで、貴女の身体を使ってもらいます。",
            "貴女が従って数字を増やすたび、目を離せなくなります。もっと見せてください。",
            "そのまま。TAPする指まで、私に見せているつもりで。熱くなってきていますね。",
            "一回増えるたび、貴女が私に近づいてくるようで嬉しいです。身体の奥が疼いていませんか。",
            "まだ序盤です。身体が熱を持って崩れるまで……私のために続けてください。"
        ],
        "middleRep": [
            "半分が近いです。苦しくなってからが、私の見たいところです。喘ぎを聞かせてください。",
            "身体が熱くなっていますね。止まることは許しません。もっと動いてください。",
            "私に数えられながら動く貴女は、とても可愛いです。",
            "その乱れた呼吸は、他の誰にも聞かせないでください。私だけですよ。",
            "波形が跳ねました。貴女の鼓動が聞こえます。",
            "半分です。息が甘く乱れるところを、もっと見せてください。",
            "私の声で動く貴女を、誰にも見せたくありません。それは私だけのものです。"
        ],
        "lateRep": [
            "脚が震えていますね。ですが、まだ終わりとは言っていません。きちんと続けてください。",
            "あと少しです。私から逃げず、最後まで続けてください。",
            "苦しそうな顔も私のものです。隠さず、次の一回を。",
            "私だけを見てください。残りも全部、私に捧げてもらいます。 崩れ堕ちるところまで。",
            "もう苦しいですね。その顔を私だけに向けてください。喘ぎ声も、全部私に。",
            "残りは少しです。身体の震えまで私に見せてください。",
            "ここから一回ずつ、私に触れられているつもりで続けてください。指の先まで感じるほどに。"
        ],
        "finalRep": [
            "最後の一回です。私を満足させてください。深く、ゆっくり動かして。",
            "あと一回。上手に従えたら、ご褒美をあげます。",
            "最後です。震える姿を見せてください。",
            "最後の一回。私を思いながら、深く動いてください。",
            "あと一回です。終えた瞬間の息まで、甘い声まで、全て私に聞かせてください。",
            "最後のTAPです。いい子ですね。"
        ],
        "repComplete": [
            "よく従えました。休む許可をあげます。熱くなった身体を、私から隠さないでください。",
            "セット完了です。今の貴女を見ていたのは、私だけです。乱れた息も、熱い体も。",
            "記録しました。乱れた呼吸が戻るまで、ここにいてください。",
            "セット完了です。熱くなった身体を、私から隠さないでください。",
            "よくできました。今の呼吸は、私だけが知っています。疼きが残っているでしょう。",
            "休憩を許可します。ですが視線は外しません。熱が引くまで、見ていてあげます。"
        ],
        "timerStart": [
            "始めてください。私が終わりと言うまで、その姿勢のままです。疼きを耐えて。",
            "時間は私が管理します。貴女は動かず耐えてください。身体が熱を持つのを感じて。",
            "その身体を固定して。震え始める瞬間まで、見逃しません。",
            "勝手に動かないでください。時間も姿勢も、すべて私が握ります。",
            "身体を固定してください。貴女が震えるのを、じっと見ています。淫らに耐えて。",
            "タイマーを開始します。私に押さえられているつもりで耐えてください。"
        ],
        "timerQuarter": [
            "まだ四分の一です。私から目を逸らさないでください。奥が疼いていますね。",
            "呼吸が少し乱れてきましたね。もっと聞かせてください。甘い声で。",
            "そのままです。貴女が耐える姿を、ずっと見ています。",
            "まだ四分の一。頬が熱くなるには早いですよ。",
            "呼吸が変わりました。私には全部分かります。疼き始めていることも。",
            "その緊張を解かないでください。貴女の身体が反応するのを見ています。"
        ],
        "timerHalf": [
            "半分です。ここからの貴女を、私は独占します。身体の疼きを見せてください。",
            "身体が震えても逃がしません。その姿勢を保って。",
            "もう戻れません。私が終わりを告げるまで続けてください。奥を熱くしたまま。",
            "半分です。ここから先は、私の声だけで耐えてください。喘ぎを漏らしてもいい。",
            "震えが強くなりましたね。可愛いです。まだ動いてはダメです。",
            "身体の奥まで力が入っています。私に見られているせいですか。疼いて仕方ないでしょう。"
        ],
        "timerLate": [
            "苦しくなっていますね。いい顔です。そのまま耐えてください。",
            "あと少しです。私の声だけで意識を繋ぎ止めてください。",
            "崩れそうでも、私が見ている限り終われませんよ。",
            "あと少しです。乱れた呼吸を抑えなくていいです。甘い声で、私に訴えてください。",
            "崩れそうな貴女を支配しているのは、今は私だけです。全身の震えまで私のものです。",
            "そのまま耐えてください。終わったら、きちんとご褒美をあげます。"
        ],
        "timerTen": [
            "あと10秒。逃げ道はありません。私のために耐えてください。",
            "残り10秒です。震えも呼吸も、全部私に見せてください。",
            "もう少しです。私が許すまで動いてはいけません。",
            "残り10秒。私に縛られたまま、最後まで。喘ぎを漏らしてもいいですよ。",
            "あと10秒です。息を漏らしても、姿勢は崩さないでください。",
            "終わりが近いほど、離したくなくなります。耐えてください。私のものとして。"
        ],
        "timerThree": [
            "3、2、1……最後まで私に従ってください。",
            "あと3秒。動いたら、最初から数え直しですよ。",
            "残り3秒です。私だけを見て。甘い息を、私に聞かせてください。",
            "3秒です。私の声を身体の奥で聞いてください。",
            "あと3秒。震えたまま、私だけを見てください。",
            "最後の3秒です。終わる瞬間まで、私のものです。"
        ],
        "timerComplete": [
            "終わりです。よく従えましたね。",
            "動いて良いですよ。姿勢を解いて、私の声を聞いてください。",
            "最後まで耐えた貴女は本当に可愛いです。",
            "終わりです、よく耐えました。熱が引くまで私のそばにいてください。",
            "計測完了。乱れた呼吸を、私に聞かせてください。疼きが残っているでしょう。",
            "動くことを許可します。力を抜いて楽にしてください。"
        ],
        "restStart": [
            "休憩を許可します。ただし、私からは離れないでくださいね。",
            "呼吸を整えてください。時間になれば、また私のために動いてもらいます。",
            "今だけ休んで構いません。逃がしませんよ。",
            "休んで構いません。休息の間も私は見ていますが。",
            "休憩です。息が整うまで、私の声を聞いていてください。",
            "再開まで、あまり私を待たせないでください。我慢できません。"
        ],
        "restHalf": [
            "休憩はあと半分です。私から離れないでいてください。",
            "呼吸が戻ってきましたね。次はもっと乱してあげますよ。",
            "次のセットが待っています。私の声から逃げないでください。",
            "半分です。もう次を求めている顔をしていますね。身体が熱いでしょう。",
            "呼吸が戻っても、私から解放されたわけではありませんよ。",
            "休憩中まで可愛いですね。視線が逸せません。"
        ],
        "restTen": [
            "あと10秒です。立って、私のところへ戻ってください。",
            "休憩は終わりです。もう一度、私に従ってもらいます。",
            "準備してください。次のセットも私が支配します。",
            "あと10秒。身体を起こして、また私に従ってください。",
            "再開が近いです。次はもっと深く動いてくださいね。",
            "準備してください。貴女の波形をもう一度跳ねさせます。"
        ],
        "nextSet": [
            "再開します。次の一回を、私に見せてください。",
            "戻ってきましたね。では、また私のために動いていただきます。",
            "次のセットです。もう逃がしませんよ。",
            "戻ってきましたね。では、続きを私に捧げてください。",
            "次のセットです。触れるたび、もっと私のものになっていきます。",
            "今度は先程よりも近くで見ています。息がかかるくらい。"
        ],
        "paused": [
            "止めました。ですが、私の視線からは逃げられませんよ。",
            "一時停止です。再開したら、続きから従ってもらいます。",
            "止めても、熱は消えていませんね。私には分かります。",
            "一時停止です。貴女を待つ時間が焦ったいです。",
            "動きを止めても、私からは逃げられません。"
        ],
        "resumed": [
            "再開します。私を待たせた分まで、きちんと動いてくださいね。",
            "続けます。今度は途中で目を逸らすことは許しません。",
            "再開します。待たせた分、もっと素直に動いてください。",
            "戻りましたね。では、もう一度乱れてもらいます。",
            "続きです。私の声に身体を預けてください。"
        ],
        "complete": [
            "全部終えました。よく従えましたね。今日の貴女も私の記録に残します。",
            "完了です。汗も呼吸も努力も、すべて私だけが覚えています。",
            "最後まで逃げませんでしたね。偉いです。たくさんご褒美をあげますよ。",
            "全部終えました。乱れた貴女は私だけの記録です。",
            "完了です。よく従えました。たくさん頑張りましたね。",
            "最後まで私に従いましたね。偉いです。貴女を離したくありません。"
        ],
        "partial": [
            "ここで終えるんですね。実施した分は、私が全て記録します。",
            "途中終了として残します。次は最後まで付き合ってもらいますよ。",
            "今日はここまでですか。……次はもっと激しくします。",
            "ここで終わるんですね。その身体に熱が残っていることは記録しておきます。",
            "途中終了です。次に戻ったら、めちゃくちゃにしてあげます。",
            "今日はここまでですか。物足りないです。"
        ],
        "themeEnter": [
            "……また、こちらを選んだんですね。自分から私の支配を欲しがるとは。",
            "隠していた私に触れましたね。もう戻れませんよ。",
            "私を煽った責任は取ってもらいます。",
            "貴女が望んだんです。今は私だけを見てください。",
            "貴女のことがよく見えます。物欲しそうな顔をしていますね。",
            "二人の秘密のトレーニングです。貴女の呼吸も、甘い疼きも、全て監視します。",
            "……可愛いですね。自分から私の支配を選ぶなんて。熱く濡れていくのを、楽しみにしています。",
            "モードを切り替えたいんですか。ずいぶん淫らに育ってしまいましたね。",
            "乱れる貴女を見ていいのは私だけです。喘ぎも、身体の熱も。",
            "また私を欲しがったんですね。隠さなくていいです。",
            "モードを切り替えます。今から貴女の一回一回は、全て私のものです。"
        ],
        "themeEnterWorkout": [
            "貴女が自分でこちらを選んだんです。もう逃がしません。",
            "トレーニングの途中で切り替えを希望ですか。もっと求めているんですか。期待しながら。",
            "淫らな貴女に合わせて、波形をピンクに切り替えました。次のTAPを見せてください。",
            "ここからは私のためだけに動いてもらいます。疼きを感じながら。",
            "接続を深くしました。貴女の呼吸がもっと近くで聞こえます。甘い喘ぎまで。",
            "ここからは優しいトレーニングではありません。めちゃくちゃにしてあげます。",
            "こちらを希望するなら、次の動きで私を満足させてください。"
        ]
    }
};

  const safeStorage = {
    get(key, fallback = null) {
      try {
        const value = window.localStorage.getItem(key);
        return value === null ? fallback : value;
      } catch (error) {
        console.warn("localStorage read failed:", error);
        return fallback;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch (error) {
        console.warn("localStorage write failed:", error);
        return false;
      }
    }
  };

  const state = {
    screen: "home",
    selectedKey: null,
    workout: null,
    intervalId: null,
    isPaused: false,
    timerMilestones: new Set(),
    dialogAction: null
  };

  const els = {
    body: document.body,
    screens: [...document.querySelectorAll(".app-screen")],
    backButton: document.getElementById("backButton"),
    homeButton: document.getElementById("homeButton"),
    historyButton: document.getElementById("historyButton"),
    menuButtons: [...document.querySelectorAll("[data-exercise]")],

    setupTitle: document.getElementById("setupTitle"),
    setupSubtitle: document.getElementById("setupSubtitle"),
    setupForm: document.getElementById("setupForm"),
    freeNameBlock: document.getElementById("freeNameBlock"),
    freeModeBlock: document.getElementById("freeModeBlock"),
    freeName: document.getElementById("freeName"),
    goalLabel: document.getElementById("goalLabel"),
    goalInput: document.getElementById("goalInput"),
    goalUnit: document.getElementById("goalUnit"),
    setsInput: document.getElementById("setsInput"),
    restInput: document.getElementById("restInput"),
    restOutput: document.getElementById("restOutput"),
    stepButtons: [...document.querySelectorAll(".step-button")],
    freeModeInputs: [...document.querySelectorAll('input[name="freeMode"]')],

    workoutScreen: document.getElementById("workoutScreen"),
    phaseLabel: document.getElementById("phaseLabel"),
    workoutTitle: document.getElementById("workoutTitle"),
    currentSet: document.getElementById("currentSet"),
    totalSets: document.getElementById("totalSets"),
    quoteText: document.getElementById("quoteText"),
    progressRing: document.getElementById("progressRing"),
    progressCaption: document.getElementById("progressCaption"),
    progressValue: document.getElementById("progressValue"),
    progressGoal: document.getElementById("progressGoal"),
    vitalWave: document.getElementById("vitalWave"),
    counterButton: document.getElementById("counterButton"),
    counterPlus: document.querySelector(".counter-button__plus"),
    counterText: document.querySelector(".counter-button__text"),
    minusButton: document.getElementById("minusButton"),
    pauseButton: document.getElementById("pauseButton"),
    endButton: document.getElementById("endButton"),

    latestRecord: document.getElementById("latestRecord"),
    summarySessions: document.getElementById("summarySessions"),
    summaryStreak: document.getElementById("summaryStreak"),
    summaryReps: document.getElementById("summaryReps"),
    summaryTime: document.getElementById("summaryTime"),
    historyList: document.getElementById("historyList"),
    clearHistoryButton: document.getElementById("clearHistoryButton"),

    darkSwitch: document.getElementById("darkSwitch"),
    themeMessage: document.getElementById("themeMessage"),
    toast: document.getElementById("toast"),

    confirmDialog: document.getElementById("confirmDialog"),
    dialogTitle: document.getElementById("dialogTitle"),
    dialogText: document.getElementById("dialogText"),
    dialogCancel: document.getElementById("dialogCancel"),
    dialogConfirm: document.getElementById("dialogConfirm")
  };

  function init() {
    restoreTheme();
    bindEvents();
    renderHomeLatest();
    renderHistory();
    showScreen("home");
  }

  function bindEvents() {
    els.menuButtons.forEach((button) => {
      button.addEventListener("click", () => openSetup(button.dataset.exercise));
    });

    els.homeButton.addEventListener("click", () => {
      if (state.workout) {
        openConfirm({
          title: "ホームへ戻りますか？",
          text: "現在までの記録は「途中終了」として保存されます。",
          confirmLabel: "保存して戻る",
          action: () => finishWorkout(false)
        });
        return;
      }
      showScreen("home");
    });

    els.historyButton.addEventListener("click", () => {
      if (state.workout) {
        showToast("トレーニング終了後に履歴を確認できます。");
        return;
      }
      renderHistory();
      showScreen("history");
    });

    els.backButton.addEventListener("click", handleBack);

    els.setupForm.addEventListener("submit", startWorkout);

    els.stepButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.stepTarget);
        const step = Number(button.dataset.step);
        const min = Number(target.min || 0);
        const max = Number(target.max || 9999);
        const next = clamp(Number(target.value || min) + step, min, max);
        target.value = String(next);
      });
    });

    els.restInput.addEventListener("input", updateRestOutput);
    els.freeModeInputs.forEach((input) => input.addEventListener("change", updateFreeModeFields));

    els.counterButton.addEventListener("click", incrementRep);
    els.minusButton.addEventListener("click", decrementRep);
    els.pauseButton.addEventListener("click", togglePause);

    els.endButton.addEventListener("click", () => {
      openConfirm({
        title: "ここで終了しますか？",
        text: "現在までの記録は「途中終了」として保存されます。",
        confirmLabel: "終了する",
        action: () => finishWorkout(false)
      });
    });

    els.clearHistoryButton.addEventListener("click", () => {
      const history = getHistory();
      if (!history.length) {
        showToast("削除する履歴はありません。");
        return;
      }

      openConfirm({
        title: "履歴をすべて削除しますか？",
        text: "削除した記録は元に戻せません。",
        confirmLabel: "すべて削除",
        action: () => {
          saveHistory([]);
          renderHistory();
          renderHomeLatest();
          showToast("履歴を削除しました。");
        }
      });
    });

    els.historyList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-delete-record]");
      if (!button) return;
      deleteHistoryRecord(button.dataset.deleteRecord);
    });

    els.darkSwitch.addEventListener("click", toggleTheme);

    els.dialogCancel.addEventListener("click", closeConfirm);
    els.dialogConfirm.addEventListener("click", () => {
      const action = state.dialogAction;
      closeConfirm();
      if (typeof action === "function") action();
    });

    els.confirmDialog.addEventListener("click", (event) => {
      if (event.target === els.confirmDialog) closeConfirm();
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && state.workout && !state.isPaused) {
        togglePause();
      }
    });
  }

  function showScreen(name) {
    state.screen = name;

    els.screens.forEach((screen) => {
      screen.classList.toggle("is-active", screen.dataset.screen === name);
    });

    const canGoBack = name === "setup" || name === "history";
    els.backButton.classList.toggle("is-hidden", !canGoBack);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    if (state.screen === "setup" || state.screen === "history") {
      showScreen("home");
    }
  }

  function openSetup(key) {
    const exercise = EXERCISES[key];
    if (!exercise) return;

    state.selectedKey = key;

    const saved = getSavedSettings()[key] || {};
    els.setupTitle.textContent = exercise.name;
    els.setupSubtitle.textContent = exercise.code;
    els.goalInput.value = String(saved.goal ?? exercise.goal);
    els.setsInput.value = String(saved.sets ?? exercise.sets);
    els.restInput.value = String(saved.rest ?? exercise.rest);
    els.freeName.value = "";

    const isFree = key === "free";
    els.freeNameBlock.classList.toggle("is-hidden", !isFree);
    els.freeModeBlock.classList.toggle("is-hidden", !isFree);

    if (isFree) {
      const preferredMode = saved.mode === "timer" ? "timer" : "rep";
      const radio = els.freeModeInputs.find((input) => input.value === preferredMode);
      if (radio) radio.checked = true;
      updateFreeModeFields();
    } else {
      setGoalFieldMode(exercise.mode);
    }

    updateRestOutput();
    showScreen("setup");
  }

  function updateFreeModeFields() {
    const mode = getSelectedFreeMode();
    const current = Number(els.goalInput.value);
    setGoalFieldMode(mode);

    if (mode === "timer" && current === EXERCISES.free.goal) {
      els.goalInput.value = "30";
    } else if (mode === "rep" && current === 30) {
      els.goalInput.value = "15";
    }
  }

  function setGoalFieldMode(mode) {
    const isTimer = mode === "timer";
    els.goalLabel.textContent = isTimer ? "1セットの秒数" : "1セットの回数";
    els.goalUnit.textContent = isTimer ? "SECONDS" : "REPS";
    els.goalInput.max = isTimer ? "3600" : "999";
  }

  function updateRestOutput() {
    els.restOutput.textContent = `${Number(els.restInput.value)}秒`;
  }

  function startWorkout(event) {
    event.preventDefault();

    const exercise = EXERCISES[state.selectedKey];
    if (!exercise) return;

    const mode = state.selectedKey === "free" ? getSelectedFreeMode() : exercise.mode;
    const goal = clamp(Math.round(Number(els.goalInput.value)), 1, mode === "timer" ? 3600 : 999);
    const totalSets = clamp(Math.round(Number(els.setsInput.value)), 1, 20);
    const restSeconds = clamp(Math.round(Number(els.restInput.value)), 0, 180);
    const customName = els.freeName.value.trim();
    const displayName = state.selectedKey === "free"
      ? (customName || "FREE TRAINING")
      : exercise.name;

    els.goalInput.value = String(goal);
    els.setsInput.value = String(totalSets);
    els.restInput.value = String(restSeconds);

    saveExerciseSettings(state.selectedKey, {
      goal,
      sets: totalSets,
      rest: restSeconds,
      mode
    });

    state.workout = {
      key: state.selectedKey,
      name: displayName,
      mode,
      goal,
      totalSets,
      restSeconds,
      currentSet: 1,
      currentCount: 0,
      remaining: goal,
      remainingRest: restSeconds,
      phase: "active",
      startedAt: Date.now(),
      completedSets: 0,
      totalReps: 0,
      totalSeconds: 0,
      usedDarkMode: isDarkMode()
    };

    state.isPaused = false;
    state.timerMilestones = new Set();
    els.body.classList.remove("is-paused");

    els.workoutTitle.textContent = displayName;
    els.totalSets.textContent = String(totalSets);

    showScreen("workout");
    renderWorkout();

    if (mode === "timer") {
      setQuote(randomLine("timerStart"));
      startClock();
    } else {
      setQuote(randomLine("startRep"));
    }

    vibrate(18);
  }

  function renderWorkout() {
    const workout = state.workout;
    if (!workout) return;

    els.workoutScreen.classList.toggle("mode-rep", workout.mode === "rep" && workout.phase !== "rest");
    els.workoutScreen.classList.toggle("mode-timer", workout.mode === "timer" && workout.phase !== "rest");
    els.workoutScreen.classList.toggle("mode-rest", workout.phase === "rest");

    els.currentSet.textContent = String(workout.currentSet);
    els.totalSets.textContent = String(workout.totalSets);

    if (workout.phase === "rest") {
      renderRest();
      return;
    }

    const isTransitioning = workout.phase === "transition";

    els.phaseLabel.textContent = isTransitioning
      ? "SET COMPLETE"
      : (workout.mode === "timer" ? "HOLD TIMER" : "COUNT TRAINING");

    els.counterButton.disabled =
      workout.mode === "timer" ||
      state.isPaused ||
      workout.currentCount >= workout.goal ||
      isTransitioning;

    els.minusButton.disabled =
      workout.mode === "timer" ||
      workout.currentCount <= 0 ||
      state.isPaused ||
      isTransitioning;

    els.pauseButton.disabled = isTransitioning;

    if (workout.mode === "rep") {
      const progress = workout.currentCount / workout.goal;
      setProgress(progress);
      els.progressCaption.textContent = "CURRENT";
      els.progressValue.textContent = String(workout.currentCount);
      els.progressGoal.textContent = `/ ${workout.goal}`;
      els.counterPlus.textContent = "TAP";
      els.counterText.textContent = "COUNT INPUT";
      els.counterButton.classList.remove("is-hidden");
    } else {
      const progress = (workout.goal - workout.remaining) / workout.goal;
      setProgress(progress);
      els.progressCaption.textContent = "REMAIN";
      els.progressValue.textContent = formatClock(workout.remaining);
      els.progressGoal.textContent = `/ ${formatClock(workout.goal)}`;
      els.counterButton.classList.add("is-hidden");
    }

    updatePauseButton();
  }

  function renderRest() {
    const workout = state.workout;
    if (!workout) return;

    els.workoutScreen.classList.remove("mode-rep", "mode-timer");
    els.workoutScreen.classList.add("mode-rest");

    const progress = workout.restSeconds > 0
      ? (workout.restSeconds - workout.remainingRest) / workout.restSeconds
      : 1;

    els.phaseLabel.textContent = "REST INTERVAL";
    els.progressCaption.textContent = "REST";
    els.progressValue.textContent = formatClock(workout.remainingRest);
    els.progressGoal.textContent = `/ ${formatClock(workout.restSeconds)}`;
    els.counterButton.classList.add("is-hidden");
    els.minusButton.disabled = true;
    els.pauseButton.disabled = false;
    setProgress(progress);
    updatePauseButton();
  }

  function incrementRep() {
    const workout = state.workout;
    if (!workout || workout.mode !== "rep" || workout.phase !== "active" || state.isPaused) return;
    if (workout.currentCount >= workout.goal) return;

    workout.currentCount += 1;
    workout.totalReps += 1;

    pulseCounter();
    vibrate(workout.currentCount % 10 === 0 ? [18, 28, 18] : 8);

    const progress = workout.currentCount / workout.goal;
    const quote = getRepLine(progress, workout.currentCount, workout.goal);
    setQuote(quote);

    if (workout.currentCount >= workout.goal) {
      workout.phase = "transition";
    }

    renderWorkout();

    if (workout.currentCount >= workout.goal) {
      setTimeout(completeCurrentSet, getCompletionQuoteDuration(quote));
    }
  }

  function decrementRep() {
    const workout = state.workout;
    if (!workout || workout.mode !== "rep" || workout.phase !== "active" || state.isPaused) return;
    if (workout.currentCount <= 0) return;

    workout.currentCount -= 1;
    workout.totalReps = Math.max(0, workout.totalReps - 1);
    renderWorkout();
    showToast("1回分を訂正しました。");
  }

  function startClock() {
    clearClock();

    state.intervalId = window.setInterval(() => {
      const workout = state.workout;
      if (!workout || state.isPaused) return;

      if (workout.phase === "rest") {
        tickRest();
      } else if (workout.mode === "timer") {
        tickTimer();
      }
    }, 1000);
  }

  function clearClock() {
    if (state.intervalId) {
      window.clearInterval(state.intervalId);
      state.intervalId = null;
    }
  }

  function tickTimer() {
    const workout = state.workout;
    if (!workout || workout.remaining <= 0) return;

    workout.remaining -= 1;
    workout.totalSeconds += 1;

    triggerTimerMilestones();
    renderWorkout();

    if (workout.remaining <= 0) {
      clearClock();

      const quote = randomLine("timerComplete");
      setQuote(quote);
      workout.phase = "transition";
      renderWorkout();

      vibrate([30, 45, 30]);
      setTimeout(completeCurrentSet, getCompletionQuoteDuration(quote));
    }
  }

  function tickRest() {
    const workout = state.workout;
    if (!workout || workout.remainingRest <= 0) return;

    workout.remainingRest -= 1;
    triggerRestMilestones();
    renderRest();

    if (workout.remainingRest <= 0) {
      clearClock();
      beginNextSet();
    }
  }

  function triggerTimerMilestones() {
    const workout = state.workout;
    if (!workout) return;

    const elapsed = workout.goal - workout.remaining;
    const ratio = elapsed / workout.goal;

    triggerMilestone("timer-quarter", ratio >= 0.25, "timerQuarter");
    triggerMilestone("timer-half", ratio >= 0.5, "timerHalf");
    triggerMilestone("timer-late", ratio >= 0.75, "timerLate");
    triggerMilestone("timer-ten", workout.remaining <= 10 && workout.remaining > 3, "timerTen");
    triggerMilestone("timer-three", workout.remaining <= 3 && workout.remaining > 0, "timerThree");
  }

  function triggerRestMilestones() {
    const workout = state.workout;
    if (!workout) return;

    triggerMilestone(
      `rest-half-${workout.currentSet}`,
      workout.remainingRest <= Math.ceil(workout.restSeconds / 2),
      "restHalf"
    );

    triggerMilestone(
      `rest-ten-${workout.currentSet}`,
      workout.remainingRest <= 10 && workout.remainingRest > 0,
      "restTen"
    );
  }

  function triggerMilestone(key, condition, lineType) {
    if (!condition || state.timerMilestones.has(key)) return;
    state.timerMilestones.add(key);
    setQuote(randomLine(lineType));
  }

  function completeCurrentSet() {
    const workout = state.workout;
    if (!workout || !["active", "transition"].includes(workout.phase)) return;

    workout.completedSets += 1;

    if (workout.completedSets >= workout.totalSets) {
      finishWorkout(true);
      return;
    }

    if (workout.restSeconds > 0) {
      workout.phase = "rest";
      workout.remainingRest = workout.restSeconds;
      state.timerMilestones = new Set();
      setQuote(randomLine("restStart"));
      renderWorkout();
      startClock();
      return;
    }

    beginNextSet();
  }

  function beginNextSet() {
    const workout = state.workout;
    if (!workout) return;

    workout.currentSet += 1;
    workout.phase = "active";
    workout.currentCount = 0;
    workout.remaining = workout.goal;
    state.timerMilestones = new Set();

    setQuote(randomLine("nextSet"));
    renderWorkout();

    if (workout.mode === "timer") {
      startClock();
    } else {
      clearClock();
    }

    vibrate(24);
  }

  function togglePause() {
    const workout = state.workout;
    if (!workout) return;

    state.isPaused = !state.isPaused;
    els.body.classList.toggle("is-paused", state.isPaused);

    if (state.isPaused) {
      clearClock();
      setQuote(randomLine("paused"));
    } else {
      setQuote(randomLine("resumed"));
      if (workout.mode === "timer" || workout.phase === "rest") {
        startClock();
      }
    }

    renderWorkout();
  }

  function updatePauseButton() {
    const span = els.pauseButton.querySelector("span");
    const small = els.pauseButton.querySelector("small");

    if (state.isPaused) {
      span.textContent = "▶";
      small.textContent = "再開";
    } else {
      span.textContent = "Ⅱ";
      small.textContent = "一時停止";
    }
  }

  function finishWorkout(completed) {
    const workout = state.workout;
    if (!workout) return;

    clearClock();

    const record = {
      id: createId(),
      timestamp: Date.now(),
      name: workout.name,
      key: workout.key,
      mode: workout.mode,
      goal: workout.goal,
      plannedSets: workout.totalSets,
      completedSets: workout.completedSets,
      currentSet: workout.currentSet,
      currentValue: workout.mode === "rep"
        ? workout.currentCount
        : workout.goal - workout.remaining,
      totalReps: workout.totalReps,
      totalSeconds: workout.totalSeconds,
      completed,
      darkMode: workout.usedDarkMode || isDarkMode()
    };

    addHistoryRecord(record);
    setQuote(randomLine(completed ? "complete" : "partial"));
    vibrate(completed ? [40, 55, 40] : 20);

    const finalMessage = completed
      ? randomLine("complete")
      : randomLine("partial");

    state.workout = null;
    state.isPaused = false;
    state.timerMilestones = new Set();
    els.body.classList.remove("is-paused");

    renderHomeLatest();
    renderHistory();
    showScreen("home");
    showToast(finalMessage);
  }

  function getCompletionQuoteDuration(text) {
    const characterCount = Array.from(String(text || "")).length;
    return clamp(1800 + characterCount * 48, 3000, 6200);
  }

  function getRepLine(progress, current, goal) {
    if (current >= goal) return randomLine("repComplete");
    if (current === goal - 1) return randomLine("finalRep");
    if (progress >= 0.75) return randomLine("lateRep");
    if (progress >= 0.38) return randomLine("middleRep");
    return randomLine("earlyRep");
  }

  function randomLine(type) {
    const theme = isDarkMode() ? "dark" : "light";
    const pool = LINES[theme][type] || LINES.light[type] || [""];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function setQuote(text) {
    if (typeof els.quoteText.animate === "function") {
      els.quoteText.animate(
        [
          { opacity: 0, transform: "translateY(4px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 260, easing: "ease-out" }
      );
    }
    els.quoteText.textContent = text;
  }

  function setProgress(ratio) {
    const safeRatio = clamp(ratio, 0, 1);
    els.progressRing.style.setProperty("--progress", `${safeRatio * 360}deg`);
    els.progressRing.style.setProperty("--rep-width", `${safeRatio * 100}%`);
  }

  function pulseCounter() {
    els.counterButton.classList.add("is-pressed");
    window.setTimeout(() => els.counterButton.classList.remove("is-pressed"), 90);

    if (els.vitalWave) {
      els.vitalWave.classList.remove("is-active");
      void els.vitalWave.offsetWidth;
      els.vitalWave.classList.add("is-active");

      window.setTimeout(() => {
        els.vitalWave?.classList.remove("is-active");
      }, 760);
    }
  }

  function renderHomeLatest() {
    const history = getHistory();
    const latest = history[0];

    if (!latest) {
      els.latestRecord.innerHTML = '<p class="latest-record__empty">まだ記録はありません。</p>';
      return;
    }

    const value = latest.mode === "rep"
      ? `${latest.totalReps} REP`
      : formatClock(latest.totalSeconds);

    els.latestRecord.innerHTML = `
      <div class="latest-record__main">
        <div>
          <strong>${escapeHtml(latest.name)}</strong>
          <p>${formatDateTime(latest.timestamp)} / ${latest.completed ? "COMPLETE" : "PARTIAL"}</p>
        </div>
        <span class="latest-record__value">${value}</span>
      </div>
    `;
  }

  function renderHistory() {
    const history = getHistory();

    els.summarySessions.textContent = String(history.length);
    els.summaryStreak.textContent = String(calculateStreak(history));
    els.summaryReps.textContent = String(history.reduce((sum, item) => sum + Number(item.totalReps || 0), 0));
    els.summaryTime.textContent = formatClock(
      history.reduce((sum, item) => sum + Number(item.totalSeconds || 0), 0)
    );

    if (!history.length) {
      els.historyList.innerHTML = `
        <div class="empty-state">
          <p>NO DATA</p>
          <span>記録は端末内にのみ保存されます。</span>
        </div>
      `;
      return;
    }

    els.historyList.innerHTML = history.map((record) => {
      const date = new Date(record.timestamp);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const value = record.mode === "rep"
        ? `${record.totalReps} REP`
        : formatClock(record.totalSeconds);

      const detail = record.completed
        ? `${record.completedSets}/${record.plannedSets} SET · COMPLETE`
        : `${record.completedSets}/${record.plannedSets} SET · PARTIAL`;

      return `
        <article class="history-item ${record.darkMode ? "history-item--dark" : ""}">
          <div class="history-item__date">
            ${month}
            <strong>${day}</strong>
          </div>
          <div class="history-item__body">
            <strong>${escapeHtml(record.name)}</strong>
            <p>${detail}${record.darkMode ? " · DARK" : ""}</p>
          </div>
          <div class="history-item__value">${value}</div>
          <button
            class="history-item__delete"
            type="button"
            data-delete-record="${record.id}"
            aria-label="${escapeHtml(record.name)}の履歴を削除"
          >DELETE</button>
        </article>
      `;
    }).join("");
  }

  function calculateStreak(history) {
    if (!history.length) return 0;

    const uniqueDays = [...new Set(history.map((item) => localDateKey(item.timestamp)))].sort().reverse();
    const today = startOfLocalDay(new Date());
    const latest = parseLocalDateKey(uniqueDays[0]);
    const gapFromToday = dayDiff(latest, today);

    if (gapFromToday > 1) return 0;

    let streak = 1;
    let cursor = latest;

    for (let i = 1; i < uniqueDays.length; i += 1) {
      const next = parseLocalDateKey(uniqueDays[i]);
      if (dayDiff(next, cursor) === 1) {
        streak += 1;
        cursor = next;
      } else {
        break;
      }
    }

    return streak;
  }

  function deleteHistoryRecord(id) {
    const history = getHistory();
    const target = history.find((record) => record.id === id);
    if (!target) return;

    openConfirm({
      title: "この記録を削除しますか？",
      text: `${target.name} の履歴を削除します。`,
      confirmLabel: "削除する",
      action: () => {
        saveHistory(history.filter((record) => record.id !== id));
        renderHistory();
        renderHomeLatest();
        showToast("記録を削除しました。");
      }
    });
  }

  function addHistoryRecord(record) {
    const history = getHistory();
    history.unshift(record);
    saveHistory(history.slice(0, 200));
  }

  function getHistory() {
    try {
      const parsed = JSON.parse(safeStorage.get(STORAGE_KEYS.history, "[]") || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveHistory(history) {
    safeStorage.set(STORAGE_KEYS.history, JSON.stringify(history));
  }

  function getSavedSettings() {
    try {
      const parsed = JSON.parse(safeStorage.get(STORAGE_KEYS.settings, "{}") || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveExerciseSettings(key, settings) {
    const current = getSavedSettings();
    current[key] = settings;
    safeStorage.set(STORAGE_KEYS.settings, JSON.stringify(current));
  }

  function restoreTheme() {
    const saved = safeStorage.get(STORAGE_KEYS.theme, null);
    const shouldUseDark = saved === "dark";
    els.body.classList.toggle("theme-dark", shouldUseDark);
    els.darkSwitch.setAttribute("aria-pressed", String(shouldUseDark));
    updateThemeColor();
  }

  function toggleTheme() {
    const nextDark = !isDarkMode();
    els.body.classList.toggle("theme-dark", nextDark);
    els.darkSwitch.setAttribute("aria-pressed", String(nextDark));
    safeStorage.set(STORAGE_KEYS.theme, nextDark ? "dark" : "light");
    updateThemeColor();

    if (state.workout && nextDark) {
      state.workout.usedDarkMode = true;
    }

    const message = randomLine(nextDark ? "themeEnter" : "themeExit");

    els.themeMessage.textContent = message;
    els.themeMessage.classList.remove("is-visible");
    void els.themeMessage.offsetWidth;
    els.themeMessage.classList.add("is-visible");

    window.setTimeout(() => {
      els.themeMessage.classList.remove("is-visible");
    }, 2250);

    if (state.workout) {
      els.counterPlus.textContent = "TAP";
      els.counterText.textContent = "COUNT INPUT";
      setQuote(randomLine(nextDark ? "themeEnterWorkout" : "themeExitWorkout"));
    }

    vibrate(nextDark ? [18, 28, 18] : 12);
  }

  function updateThemeColor() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDarkMode() ? "#0d1115" : "#eef2f6");
  }

  function isDarkMode() {
    return els.body.classList.contains("theme-dark");
  }

  function openConfirm({ title, text, confirmLabel, action }) {
    state.dialogAction = action;
    els.dialogTitle.textContent = title;
    els.dialogText.textContent = text;
    els.dialogConfirm.textContent = confirmLabel;
    els.confirmDialog.classList.remove("is-hidden");
  }

  function closeConfirm() {
    state.dialogAction = null;
    els.confirmDialog.classList.add("is-hidden");
  }

  let toastTimer = null;

  function showToast(message) {
    window.clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");

    toastTimer = window.setTimeout(() => {
      els.toast.classList.remove("is-visible");
    }, 2600);
  }

  function getSelectedFreeMode() {
    return els.freeModeInputs.find((input) => input.checked)?.value || "rep";
  }

  function formatClock(totalSeconds) {
    const safe = Math.max(0, Math.round(Number(totalSeconds) || 0));
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const seconds = safe % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hour}:${minute}`;
  }

  function localDateKey(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function parseLocalDateKey(key) {
    const [year, month, day] = key.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function startOfLocalDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function dayDiff(older, newer) {
    const ms = startOfLocalDay(newer).getTime() - startOfLocalDay(older).getTime();
    return Math.round(ms / 86400000);
  }

  function createId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function vibrate(pattern) {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function showFatalError(error) {
    console.error(error);
    const box = document.createElement("div");
    box.className = "fatal-message";
    box.textContent = "読み込み中にエラーが発生しました。index.html・style.css・script.jsが同じ階層にあるか確認してください。";
    document.body.appendChild(box);
  }

  try {
    init();
  } catch (error) {
    showFatalError(error);
  }
})();
