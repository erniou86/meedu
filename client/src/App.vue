<template>
  <div class="container">
    <header>
      <h1 @click="view = 'home'" style="cursor:pointer">MeEdu</h1>
      <span style="font-size:13px;color:var(--muted)">开源在线教育平台</span>
    </header>

    <template v-if="view === 'home'">
      <div class="grid">
        <div class="card" v-for="c in courses" :key="c.id" @click="openCourse(c.id)">
          <img :src="c.cover" :alt="c.title" />
          <div class="body">
            <h3>{{ c.title }}</h3>
            <p>{{ c.description }}</p>
            <span class="price">{{ c.price === 0 ? '免费' : '¥' + c.price }}</span>
            <span style="color:var(--muted);font-size:12px;margin-left:8px">{{ c.chapterCount }} 章节</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <button class="btn back" @click="view = 'home'">← 返回</button>
      <div class="detail" v-if="current">
        <h2>{{ current.title }}</h2>
        <div class="meta">{{ current.description }}</div>
        <p style="margin-bottom:16px"><span class="price">{{ current.price === 0 ? '免费' : '¥' + current.price }}</span></p>
        <button class="btn" @click="buy(current.id)">购买课程</button>
        <div style="margin-top:24px">
          <div class="chapter" v-for="ch in current.chapters" :key="ch.id">
            <span>▶ {{ ch.title }}</span>
            <span class="dur">{{ ch.duration }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return { view: 'home', courses: [], current: null };
  },
  async created() {
    const r = await fetch('/api/courses');
    this.courses = await r.json();
  },
  methods: {
    async openCourse(id) {
      const r = await fetch('/api/courses/' + id);
      this.current = await r.json();
      this.view = 'detail';
    },
    async buy(id) {
      const r = await fetch('/api/courses/' + id + '/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'demo' }),
      });
      const d = await r.json();
      alert(d.ok ? '购买成功！' : (d.error || '购买失败'));
    },
  },
};
</script>
