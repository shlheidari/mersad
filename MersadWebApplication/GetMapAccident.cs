using System;

namespace MersadWebApplication
{
	// Token: 0x0200000C RID: 12
	public class GetMapAccident
	{
		// Token: 0x17000029 RID: 41
		// (get) Token: 0x0600007C RID: 124 RVA: 0x000023FF File Offset: 0x000005FF
		// (set) Token: 0x0600007D RID: 125 RVA: 0x00002407 File Offset: 0x00000607
		public string Id { get; set; }

		// Token: 0x1700002A RID: 42
		// (get) Token: 0x0600007E RID: 126 RVA: 0x00002410 File Offset: 0x00000610
		// (set) Token: 0x0600007F RID: 127 RVA: 0x00002418 File Offset: 0x00000618
		public string Location { get; set; }

		// Token: 0x1700002B RID: 43
		// (get) Token: 0x06000080 RID: 128 RVA: 0x00002421 File Offset: 0x00000621
		// (set) Token: 0x06000081 RID: 129 RVA: 0x00002429 File Offset: 0x00000629
		public string CrashType { get; set; }

		// Token: 0x1700002C RID: 44
		// (get) Token: 0x06000082 RID: 130 RVA: 0x00002432 File Offset: 0x00000632
		// (set) Token: 0x06000083 RID: 131 RVA: 0x0000243A File Offset: 0x0000063A
		public string CheckByPoliceStationAdmin { get; set; }

		// Token: 0x1700002D RID: 45
		// (get) Token: 0x06000084 RID: 132 RVA: 0x00002443 File Offset: 0x00000643
		// (set) Token: 0x06000085 RID: 133 RVA: 0x0000244B File Offset: 0x0000064B
		public string CheckByCampAdmin { get; set; }
	}
}
