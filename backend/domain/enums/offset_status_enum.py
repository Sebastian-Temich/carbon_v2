class OffsetStatuses:
    PENDING = 'PENDING'  # offset from developer waiting for approval
    ACCEPTED = 'ACCEPTED'  # offset from developer approved by moderator (on the marketplace)
    REJECTED = 'REJECTED'  # offset from developer rejected by moderator
    NOT_LISTED = 'NOT_LISTED'  # offset not listed on the marketplace, in someone's portfolio
    MARKETPLACE = 'MARKETPLACE'  # offset listed on the marketplace again after being bought
    SOLD_OUT = 'SOLD_OUT'  # offset after all units have been sold
    RETIRED = 'RETIRED'  # offset after all units have been sold and were later retired
