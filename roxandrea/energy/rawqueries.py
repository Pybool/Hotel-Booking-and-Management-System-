meter_reading = """
        SELECT
            AC.MSNO,
            PG.Descr,
            CONVERT(VARCHAR(50),
                SUM(
                    CASE
                        WHEN FDAY.KWH_ABS IS NULL THEN (FDAY.KWH_IMPORT + FDAY.KWH_EXPORT)
                        ELSE CAST(FDAY.KWH_ABS AS MONEY)
                    END
                ),
                1
            ) AS consumption
        FROM
            PowerSys.dbo.ACHV_METER AS AC
        LEFT JOIN
            PowerSys.dbo.ACHV_POC AS POC ON AC.ID = POC.Meter_ID
        LEFT JOIN
            PowerSys.dbo.ACHV_CUSTOMER AS CUS ON CUS.ID = POC.Customer_ID
        LEFT JOIN
            PowerSys.dbo.ACHV_POWERGRID_NAME AS PNG ON PNG.ID = POC.PowerGrid_ID
        LEFT JOIN
            PowerSys.dbo.ACHV_POWERGRID AS PG ON PG.ID = PNG.ID
        LEFT JOIN
            PowerSys.dbo.DATA_F_DPS_DAY AS FDAY ON FDAY.MSNO = AC.MSNO
        LEFT JOIN
            PowerSys.dbo.SYS_BASE AS SYS ON SYS.Key = CUS.CustomerType
        WHERE
            SYS.Tag = 'CustomerType'
            AND SYS.Value = %s
            AND YEAR(FDAY.BEGINTIME) = %s
            AND MONTH(FDAY.BEGINTIME) = %s
        GROUP BY
            AC.MSNO,
            PG.Descr
        ORDER BY
            CASE
                WHEN CONVERT(VARCHAR(50), SUM(CAST(FDAY.KWH_ABS AS MONEY)), 1) IS NULL THEN 1
                ELSE 0
            END,
            CONVERT(VARCHAR(50), SUM(CAST(FDAY.KWH_ABS AS MONEY)), 1) DESC
        OFFSET %s ROWS
        FETCH NEXT %s ROWS ONLY
    """


summary_query = """
        SELECT
            AC.MSNO,
            CONVERT(VARCHAR(50),
                SUM(
                    CASE
                        WHEN FDAY.KWH_ABS IS NULL THEN (FDAY.KWH_IMPORT + FDAY.KWH_EXPORT)
                        ELSE CAST(FDAY.KWH_ABS AS MONEY)
                    END
                ),
                1
            ) AS consumption
        FROM
            PowerSys.dbo.ACHV_METER AS AC
        LEFT JOIN
            PowerSys.dbo.ACHV_POC AS POC ON AC.ID = POC.Meter_ID
        LEFT JOIN
            PowerSys.dbo.ACHV_CUSTOMER AS CUS ON CUS.ID = POC.Customer_ID
        LEFT JOIN
            PowerSys.dbo.DATA_F_DPS_DAY AS FDAY ON FDAY.MSNO = AC.MSNO
        LEFT JOIN
            PowerSys.dbo.SYS_BASE AS SYS ON SYS.Key = CUS.CustomerType
        WHERE
            SYS.Tag = 'CustomerType'
            AND SYS.Value = 'Governments/Organizations'
            AND YEAR(FDAY.BEGINTIME) = ?
            AND MONTH(FDAY.BEGINTIME) = ?
        GROUP BY
            AC.MSNO
    """
    

query1 = """SELECT
            FDAY.MSNO,
            FDAY.DATE,
            PG.Descr,
            FDAY.SAVEDB_TIME,
            FDAY.BEGINTIME,
            FDAY.ENDTIME,
            FDAY.KWH_ABS,
            FDAY.KWH_ABS_START,
            FDAY.KWH_IMPORT,
            FDAY.KWH_EXPORT,
            FDAY.KWH_ABS_END,
            PNG.Region,
            PNG.BusinessHub,
            PNG.Transformer,
            SYS.Value AS AssetType
        FROM
            PowerSys.dbo.DATA_F_DPS_DAY AS FDAY
        LEFT JOIN
            PowerSys.dbo.ACHV_METER AS MT ON MT.MSNO = FDAY.MSNO
        LEFT JOIN
            PowerSys.dbo.ACHV_POC AS POC ON MT.ID = POC.Meter_ID
        LEFT JOIN
            PowerSys.dbo.ACHV_POWERGRID_NAME AS PNG ON PNG.ID = POC.PowerGrid_ID
        LEFT JOIN
            PowerSys.dbo.ACHV_POWERGRID AS PG ON PG.ID = PNG.ID
        LEFT JOIN
            PowerSys.dbo.ACHV_CUSTOMER AS CUS ON CUS.ID = POC.Customer_ID
        LEFT JOIN
            PowerSys.dbo.SYS_BASE AS SYS ON SYS.Key = CUS.CustomerType
        WHERE
            SYS.Tag = 'CustomerType'
            AND SYS.Value = @reqStatus
        ORDER BY
            FDAY.SAVEDB_TIME DESC
        OFFSET 0 ROWS
        FETCH NEXT 100 ROWS ONLY;
        """

query2 = """SELECT
            FDAY.MSNO,
            FDAY.DATE,
            PG.Descr,
            FDAY.SAVEDB_TIME,
            FDAY.BEGINTIME,
            FDAY.ENDTIME,
            FDAY.KWH_ABS,
            FDAY.KWH_ABS_START,
            FDAY.KWH_IMPORT,
            FDAY.KWH_EXPORT,
            FDAY.KWH_ABS_END,
            PNG.Region,
            PNG.BusinessHub,
            PNG.Transformer,
            SYS.Value AS AssetType
        FROM
            PowerSys.dbo.DATA_F_DPS_DAY AS FDAY
        LEFT JOIN
            PowerSys.dbo.ACHV_METER AS MT ON MT.MSNO = FDAY.MSNO
        LEFT JOIN
            PowerSys.dbo.ACHV_POC AS POC ON MT.ID = POC.Meter_ID
        LEFT JOIN
            PowerSys.dbo.ACHV_POWERGRID_NAME AS PNG ON PNG.ID = POC.PowerGrid_ID
        LEFT JOIN
            PowerSys.dbo.ACHV_POWERGRID AS PG ON PG.ID = PNG.ID
        LEFT JOIN
            PowerSys.dbo.ACHV_CUSTOMER AS CUS ON CUS.ID = POC.Customer_ID
        LEFT JOIN
            PowerSys.dbo.SYS_BASE AS SYS ON SYS.Key = CUS.CustomerType
        WHERE
            SYS.Tag = 'CustomerType'
            AND SYS.Value = @reqStatus
        ORDER BY
            FDAY.SAVEDB_TIME DESC
        OFFSET 0 ROWS
        FETCH NEXT 100 ROWS ONLY;
        """

        # GET SINGLE METER NO READINGS
        # SELECT
        #     AC.MSNO,
        #     PG.Descr,
        #     CONVERT(VARCHAR(50),
        #         SUM(
        #             CASE
        #                 WHEN FDAY.KWH_ABS IS NULL THEN (FDAY.KWH_IMPORT + FDAY.KWH_EXPORT)
        #                 ELSE CAST(FDAY.KWH_ABS AS MONEY)
        #             END
        #         ),
        #         1
        #     ) AS consumption
        # FROM
        #     DQS_STAGING_DATA.dbo.ACHV_METER AS AC
        # LEFT JOIN
        #     DQS_STAGING_DATA.dbo.ACHV_POC AS POC ON AC.ID = POC.Meter_ID
        # LEFT JOIN
        #     DQS_STAGING_DATA.dbo.ACHV_CUSTOMER AS CUS ON CUS.ID = POC.Customer_ID
        # LEFT JOIN
        #     DQS_STAGING_DATA.dbo.ACHV_POWERGRID_NAME AS PNG ON PNG.ID = POC.PowerGrid_ID
        # LEFT JOIN
        #     DQS_STAGING_DATA.dbo.ACHV_POWERGRID AS PG ON PG.ID = PNG.ID
        # LEFT JOIN
        #     DQS_STAGING_DATA.dbo.DATA_F_DPS_DAY AS FDAY ON FDAY.MSNO = AC.MSNO
        # LEFT JOIN
        #     DQS_STAGING_DATA.dbo.SYS_BASE AS [SYS] ON [SYS].[Key] = CUS.CustomerType
        # WHERE
        #     SYS.Tag = 'CustomerType'
        #     AND SYS.Value = 'DT'
        #     AND YEAR(FDAY.BEGINTIME) = '2022'
        #     AND MONTH(FDAY.BEGINTIME) = '04'
		# 	AND AC.MSNO = '15402635'
        # GROUP BY
        #     AC.MSNO,
        #     PG.Descr
        # ORDER BY
        #     CASE
        #         WHEN CONVERT(VARCHAR(50), SUM(CAST(FDAY.KWH_ABS AS MONEY)), 1) IS NULL THEN 1
        #         ELSE 0
        #     END,
        #     CONVERT(VARCHAR(50), SUM(CAST(FDAY.KWH_ABS AS MONEY)), 1) DESC

    # GET SUMMARY SAMPLE
    # SELECT
    #         AC.MSNO,
    #         CONVERT(VARCHAR(50),
    #             SUM(
    #                 CASE
    #                     WHEN FDAY.KWH_ABS IS NULL THEN (FDAY.KWH_IMPORT + FDAY.KWH_EXPORT)
    #                     ELSE CAST(FDAY.KWH_ABS AS MONEY)
    #                 END
    #             ),
    #             1
    #         ) AS consumption
    #     FROM
    #         DQS_STAGING_DATA.dbo.ACHV_METER AS AC
    #     LEFT JOIN
    #         DQS_STAGING_DATA.dbo.ACHV_POC AS POC ON AC.ID = POC.Meter_ID
    #     LEFT JOIN
    #         DQS_STAGING_DATA.dbo.ACHV_CUSTOMER AS CUS ON CUS.ID = POC.Customer_ID
    #     LEFT JOIN
    #         DQS_STAGING_DATA.dbo.DATA_F_DPS_DAY AS FDAY ON FDAY.MSNO = AC.MSNO
    #     LEFT JOIN
    #         DQS_STAGING_DATA.dbo.SYS_BASE AS [SYS] ON [SYS].[Key] = CUS.CustomerType
    #     WHERE
    #         SYS.Tag = 'CustomerType'
    #         AND SYS.Value = 'DT'
    #         AND YEAR(FDAY.BEGINTIME) = '2022'
    #         AND MONTH(FDAY.BEGINTIME) = '04'
    #     GROUP BY
    #         AC.MSNO