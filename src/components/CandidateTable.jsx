export default function CandidateTable({
  candidates,
}) {
  return (
    <>
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr>
              <th>SBD</th>
              <th>Họ tên</th>
              <th>Trường</th>
              <th>Toán</th>
              <th>Lý</th>
              <th>Hóa</th>
              <th>Phòng</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map(
              (c) => (
                <tr
                  key={c._id}
                >
                  <td>
                    {
                      c.examNumber
                    }
                  </td>

                  <td>
                    {
                      c.fullName
                    }
                  </td>

                  <td>
                    {
                      c.schoolName
                    }
                  </td>

                  <td>
                    {
                      c.scores
                        ?.math
                    }
                  </td>

                  <td>
                    {
                      c.scores
                        ?.physics
                    }
                  </td>

                  <td>
                    {
                      c.scores
                        ?.chemistry
                    }
                  </td>

                  <td>
                    {
                      c.examRoom
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {candidates.map(
          (c) => (
            <div
              key={c._id}
              className="
                bg-gray-50
                p-4
                rounded-xl
                mb-3
              "
            >
              <div className="font-bold">
                {
                  c.fullName
                }
              </div>

              <div>
                SBD:
                {
                  c.examNumber
                }
              </div>

              <div>
                Toán:
                {
                  c.scores
                    ?.math
                }
              </div>

              <div>
                Lý:
                {
                  c.scores
                    ?.physics
                }
              </div>

              <div>
                Hóa:
                {
                  c.scores
                    ?.chemistry
                }
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}