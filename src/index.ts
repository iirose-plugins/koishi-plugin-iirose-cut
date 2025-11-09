import { Context, Schema } from 'koishi';

export const name = 'iirose-cut-song';

export const inject = ['database'];

export const usage = `
---

BOT需要有房间成员的星标权限 / 管理权限。

如果你的bot没有权限，则可以发起cut投票，请使用 iirose-self-cut 插件。

---

使用指令以切歌：

- iirose.media.cut ： 终止当前歌曲
- iirose.media.cutall ： 终止所有歌曲

---

本插件需要调用者需要至少2级权限。

如果你的权限不够，请使用 change-auth-callme 插件来提权。

务必不要使用1级权限，否则可能会导致

---
`;

export interface Config
{
  commandAuthority: number;
}

export const Config: Schema<Config> = Schema.object({
  commandAuthority: Schema.number().role('slider').min(0).max(5).step(1).default(2).description("指令权限等级"),
});

export function apply(ctx: Context, config: Config)
{
  ctx
    .command('iirose.media.cut', '终止当前歌曲', { authority: config.commandAuthority })
    .action(async ({ session }) =>
    {
      if (session.platform !== "iirose")
      {
        return "暂不支持其他平台。";
      }
      await session.bot.internal.cutOne();
      return;
    });
  ctx
    .command('iirose.media.cutall', '终止所有歌曲', { authority: config.commandAuthority })
    .action(async ({ session }) =>
    {
      if (session.platform !== "iirose")
      {
        return "暂不支持其他平台。";
      }
      await session.bot.internal.cutAll();
      return;
    });
}
